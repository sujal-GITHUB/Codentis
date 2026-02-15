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