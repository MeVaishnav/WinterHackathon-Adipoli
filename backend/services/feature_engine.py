# backend/services/feature_engine.py

import pandas as pd

def extract_features(transactions):
    df = pd.DataFrame(transactions)

    features = {
        "total_transactions": len(df),
        "credit_ratio": len(df[df["type"]=="CREDIT"]) / len(df),
        "avg_amount": df["amount"].mean()
    }

    return features