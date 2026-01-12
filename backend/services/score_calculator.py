def calculate_trust_score(df):
    score = 0

    total_credit = df["credit"].sum()
    total_debit = df["debit"].sum()
    avg_balance = df["balance"].mean()
    credit_count = (df["credit"] > 0).sum()
    low_balance_events = (df["balance"] < 1000).sum()

    # Income strength (30)
    score += 30 if total_credit >= 50000 else \
             25 if total_credit >= 30000 else \
             20 if total_credit >= 15000 else 10

    # Income stability (25)
    score += 25 if credit_count >= 20 else \
             18 if credit_count >= 10 else \
             12 if credit_count >= 5 else 5

    # Balance health (20)
    score += 20 if avg_balance >= 15000 else \
             15 if avg_balance >= 8000 else \
             10 if avg_balance >= 3000 else 5

    # Spending control (15)
    ratio = total_credit / max(total_debit, 1)
    score += 15 if ratio >= 1.5 else \
             10 if ratio >= 1.1 else 5

    # Risk penalties (-30)
    score -= 30 if low_balance_events > 10 else \
             20 if low_balance_events > 5 else \
             10 if low_balance_events > 2 else 0

    score = max(0, min(100, score))

    decision = (
        "Eligible for Loan" if score >= 70
        else "Eligible with Risk" if score >= 50
        else "Not Eligible"
    )

    return {
        "trust_score": score,
        "decision": decision
    }
