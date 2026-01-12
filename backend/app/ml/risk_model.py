import math

def calculate_trust_score(credit_points: int, vendor_age_days: int) -> float:
    """
    Improved trust score calculation (non-linear, no plateaus)
    Returns score between 0-100
    """

    # Non-linear credit growth (logarithmic)
    credit_score = min(math.log10(credit_points + 1) * 35, 75)

    # Age grows slower but steadily
    age_score = min(math.sqrt(vendor_age_days) * 1.5, 20)

    # Stability bonus for very strong vendors
    bonus = 0
    if credit_points >= 2000:
        bonus += 3
    if credit_points >= 5000:
        bonus += 5
    if vendor_age_days >= 365:
        bonus += 5

    total_score = credit_score + age_score + bonus
    return round(min(total_score, 100), 2)


def determine_risk_level(trust_score: float) -> str:
    """
    Determine risk level based on trust score
    """
    if trust_score >= 75:
        return "Low"
    elif trust_score >= 40:
        return "Medium"
    else:
        return "High"


def predict_risk(credit_points: int, vendor_age_days: int) -> dict:
    """
    Main prediction function
    """
    trust_score = calculate_trust_score(credit_points, vendor_age_days)
    risk_level = determine_risk_level(trust_score)

    return {
        "trust_score": trust_score,
        "risk_level": risk_level
    }
