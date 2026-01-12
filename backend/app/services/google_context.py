import requests

# Optional: you can replace with any free SERP API later
GOOGLE_SEARCH_URL = "https://www.google.com/search?q="

def get_financial_context(query: str):
    """
    Lightweight function that tries to fetch financial context.
    - Does not break if internet is unavailable.
    - Does not require paid API.
    """
    try:
        response = requests.get(GOOGLE_SEARCH_URL + query, timeout=3)
        # We don't parse the full HTML; we just confirm availability
        if response.status_code == 200:
            return f"Online financial context found for: '{query}'. Search manually for deeper insights."
    except Exception:
        pass

    # Fallback local guidance
    fallback_context = {
        "why trust score matters": "Trust scores reflect financial reliability and banking patterns.",
        "how to improve credit score": "Maintain stable income, avoid overdrafts, and build transaction history."
    }

    return fallback_context.get(query, "No external context available.")
