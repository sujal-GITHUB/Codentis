from tools.base import Tool, ToolResult, ToolKind, ToolInvocation
from pydantic import BaseModel, Field
from ddgs import DDGS

class WebSearchParams(BaseModel):
    query: str = Field(..., description="The search query.")
    max_results: int = Field(10, ge=1, le=20, description="The maximum number of results to return.")

class WebSearchTool(Tool):
    name = "web_search"
    description = "Search the web for information. Returns search results as a list of links, titles, and snippets."
    kind = ToolKind.NETWORK
    schema = WebSearchParams
    
    async def execute(self, invocation: ToolInvocation) -> ToolResult:
        params = WebSearchParams(**invocation.params)
        
        try:
            ddgs = DDGS()
            results = ddgs.text(
                params.query, 
                region="us-en", 
                safesearch="off", 
                timeout=10,
                lang="en",
                backend="auto"
            )
        except Exception as e:
            return ToolResult.error_result(f"Search failed: {e}")

        if not results:
            return ToolResult.error_result(f"No results found for : {params.query}",
            metadata={
                "query": params.query,
                "results": 0
            })

        output_lines = [f"Search results for: {params.query}"]
        for i, result in enumerate(results):
            title = result.get('title', 'No Title')
            link = result.get('href') or result.get('link') or 'No Link'
            body = result.get('body', '')
            
            output_lines.append(f"{i+1}. Title: {title}\nLink: {link}")
            if body:
                output_lines.append(f"Snippet: {body}\n")
        
        output_lines.append("")

        return ToolResult.success_result("\n".join(output_lines), metadata={
            "query": params.query,
            "results": len(results)
        })
