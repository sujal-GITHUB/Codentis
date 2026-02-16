import tiktoken

def get_tokenizer(model: str):
    try:
        encoding = tiktoken.encoding_for_model(model)
        return encoding.encode
    except Exception as e:
        encoding = tiktoken.get_encoding("cl100k_base")
        return encoding.encode

def estimate_tokens(text: str, model: str)->int:
    return max(1, len(text) // 4)
    
def count_tokens(text: str, model: str)->int:
    tokenizer = get_tokenizer(model)

    if tokenizer is None:
        return estimate_tokens(text, model)
    
    return len(tokenizer(text))

def truncate_text(text: str, max_tokens: int, model: str, suffix: str="\n...[TRUNCATED]", preserve_lines: bool = True) -> str:
    current_tokens = count_tokens(text, model)

    if current_tokens <= max_tokens:
        return text
    
    suffix_tokens = count_tokens(suffix, model)
    target_tokens = max_tokens - suffix_tokens

    if target_tokens <= 0:
        return suffix[:max_tokens]

    if preserve_lines:
        return truncate_by_lines(text, target_tokens, model, suffix)
    else:
        return truncate_by_characters(text, target_tokens, model, suffix)

def truncate_by_lines(text: str, target_tokens: int, model: str, suffix: str)->str:
    lines = text.split('\n')
    result_lines: list[str] = []
    current_tokens = 0
    
    for line in lines:
        line_tokens = count_tokens(line, model)
        if current_tokens + line_tokens > target_tokens:
            break
        result_lines.append(line)
        current_tokens += line_tokens
    
    if not result_lines:
        return truncate_by_characters(text, target_tokens, model, suffix)
    
    return "\n".join(result_lines) + suffix

def truncate_by_characters(text: str, target_tokens: int, model: str, suffix: str)->str:
    low = 0
    high = len(text)

    while low < high:
        mid = (low + high + 1) // 2
        if count_tokens(text[:mid], model) <= target_tokens:
            low = mid
        else:
            high = mid-1

    return text[:low] + suffix