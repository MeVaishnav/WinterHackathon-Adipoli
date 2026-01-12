import math

def calculate_trust_score(
    avg_monthly_sales: float,
    sales_variance: float,
    repayment_history: float,
    outstanding_loans: float,
    years_active: float
) -> float:
    """
    Business-behavior-based trust score (0–100)
    """

    # 1️⃣ Sales strength (0–30)
    sales_score = min(math.log1p(avg_monthly_sales) * 3, 30)

    # 2️⃣ Sales stability (0–20) → lower variance = better
    stability_score = max(20 - (sales_variance / 5), 0)

    # 3️⃣ Repayment discipline (0–25)
    repayment_score = (repayment_history / 100) * 25

    # 4️⃣ Debt burden (0–15) → lower loans = better
    debt_score = max(15 - (outstanding_loans / 1_000_000), 0)

    # 5️⃣ Business maturity (0–10)
    maturity_score = min(years_active * 2, 10)

    total = (
        sales_score +
        stability_score +
        repayment_score +
        debt_score +
        maturity_score
    )

    return round(min(total, 100), 2)


def determine_risk_level(trust_score: float) -> str:
    if trust_score >= 80:
        return "Low"
    elif trust_score >= 55:
        return "Medium"
    else:
        return "High"


def predict_risk(data: dict) -> dict:
    trust_score = calculate_trust_score(**data)
    risk_level = determine_risk_level(trust_score)

    approval_probability = min(trust_score + 10, 95)
    recommended_limit = int(trust_score * 4000)

    interest_rate = (
        "9% - 11%" if trust_score >= 80 else
        "11% - 14%" if trust_score >= 60 else
        "15% - 18%"
    )

    return {
        "trust_score": trust_score,
        "risk_level": risk_level,
        "approval_probability": approval_probability,
        "recommended_limit": recommended_limit,
        "interest_rate": interest_rate
    }
