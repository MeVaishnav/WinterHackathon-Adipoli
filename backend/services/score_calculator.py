def calculate_score(df):
    score = 100

    avg_balance = df["balance"].mean()
    income = df["credit"].sum()
    overdrafts = (df["balance"] < 1000).sum()

    if avg_balance < 5000:
        score -= 20

    if overdrafts > 3:
        score -= 30

    if income > 30000:
        score += 20

    score = max(0, min(score, 100))

    decision = (
        "Eligible for Loan" if score >= 70
        else "Eligible with Risk" if score >= 50
        else "Not Eligible"
    )

    return {
        "trust_score": score,
        "decision": decision,
        "metrics": {
            "average_balance": round(avg_balance, 2),
            "total_income": income,
            "overdrafts": overdrafts
        }
    }
