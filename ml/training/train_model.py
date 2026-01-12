import pandas as pd
import numpy as np
import os
import joblib

from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from xgboost import XGBRegressor, XGBClassifier

# ---------------------------
# Paths
# ---------------------------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data", "vendor_data.csv")
MODEL_DIR = os.path.join(BASE_DIR, "models")
os.makedirs(MODEL_DIR, exist_ok=True)

# ---------------------------
# Load Dataset
# ---------------------------
df = pd.read_csv(DATA_PATH)

FEATURE_COLUMNS = [
    "avg_monthly_sales",
    "sales_variance",
    "repayment_history",
    "late_payments",
    "years_active",
    "transaction_count",
    "customer_rating",
    "dispute_count",
    "outstanding_loans",
    "gst_compliance",
]

X = df[FEATURE_COLUMNS]

# ---------------------------
# TRUST SCORE MODEL (Regression)
# ---------------------------
y_trust = df["trust_score"]

trust_model = XGBRegressor(
    n_estimators=150,
    max_depth=4,
    learning_rate=0.08,
    subsample=0.9,
    colsample_bytree=0.9,
    random_state=42
)

trust_model.fit(X, y_trust)

# ---------------------------
# RISK MODEL (Classification)
# ---------------------------
label_encoder = LabelEncoder()
y_risk = label_encoder.fit_transform(df["risk_label"])

risk_model = XGBClassifier(
    n_estimators=120,
    max_depth=3,
    learning_rate=0.1,
    subsample=0.9,
    colsample_bytree=0.9,
    objective="multi:softprob",
    num_class=len(label_encoder.classes_),
    random_state=42,
    eval_metric="mlogloss"
)

risk_model.fit(X, y_risk)

# ---------------------------
# Save Models
# ---------------------------
joblib.dump(trust_model, os.path.join(MODEL_DIR, "trust_model.pkl"))
joblib.dump(risk_model, os.path.join(MODEL_DIR, "risk_model.pkl"))
joblib.dump(label_encoder, os.path.join(MODEL_DIR, "risk_label_encoder.pkl"))

print("Models saved successfully")
