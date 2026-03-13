from tools.base import Tool, ToolResult, ToolKind, ToolInvocation
from pydantic import BaseModel, Field
from urllib.parse import urlparse
import httpx
try:
    from bs4 import BeautifulSoup
except ImportError:
    BeautifulSoup = None

class WebFetchParams(BaseModel):
    url: str = Field(..., description="The URL to fetch.")
    raw: bool = Field(False, description="Return raw HTML instead of cleaned text. Defaults to False.")
    timeout: int = Field(30, ge=5, le=120, description="Maximum number of seconds to wait for the page load (default: 30)")

class WebFetchTool(Tool):
    name = "web_fetch"
    description = "Fetch a web page. By default, it extracts clean text to save tokens and avoid noise."
    kind = ToolKind.NETWORK
    schema = WebFetchParams
    
    async def execute(self, invocation: ToolInvocation) -> ToolResult:
        params = WebFetchParams(**invocation.params)

        parsed_url = urlparse(params.url)
        if parsed_url.scheme not in ["http", "https"]:
            return ToolResult.error_result(f"Invalid URL scheme: {parsed_url.scheme}")
        
        try:
            async with httpx.AsyncClient(
                timeout=httpx.Timeout(params.timeout, connect=params.timeout),
                follow_redirects=True,
                headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"}
            ) as client:
                response = await client.get(params.url)
                response.raise_for_status()
                text = response.text
                
                if not params.raw and BeautifulSoup:
                    soup = BeautifulSoup(text, 'html.parser')
                    # Remove all script and style elements
                    for script in soup(["script", "style"]):
                        script.decompose()
                    
                    # Get text and clean it up
                    text = soup.get_text(separator='\n')
                    # break into lines and remove leading and trailing space on each
                    lines = (line.strip() for line in text.splitlines())
                    # break multi-headlines into a line each
                    chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
                    # drop blank lines
                    text = '\n'.join(chunk for chunk in chunks if chunk)
                    
        except httpx.HTTPStatusError as e:
            return ToolResult.error_result(f"HTTP error: {e.response.status_code} : {e.response.reason_phrase}")
        except Exception as e:  
            return ToolResult.error_result(f"Failed to fetch URL: {e}")
        
        if len(text) > 50*1024:
            text = text[:50*1024] + "\n... [content truncated]"
            
        return ToolResult.success_result(text,
            metadata={
                "status_code": response.status_code,
                "url": params.url,
                "content_length": len(response.content),
                "is_raw": params.raw,
                "title": soup.title.string.strip() if not params.raw and BeautifulSoup and soup.title else None
            })
