def calculate_trust_score(features):
    score = (
        features["credit_ratio"] * 50 +
        min(features["total_transactions"], 100) * 0.3 +
        features["avg_amount"] * 0.01
    )
    return round(min(score, 100), 2)