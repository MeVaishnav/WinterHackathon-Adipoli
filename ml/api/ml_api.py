from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
import joblib
import os

# ---------------------------
# App Initialization
# ---------------------------
app = FastAPI(title="CrediAI ML API", version="1.0")

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_DIR = os.path.join(BASE_DIR, "models")

# ---------------------------
# Load Models
# ---------------------------
trust_model = joblib.load(os.path.join(MODEL_DIR, "trust_model.pkl"))
risk_model = joblib.load(os.path.join(MODEL_DIR, "risk_model.pkl"))
label_encoder = joblib.load(os.path.join(MODEL_DIR, "risk_label_encoder.pkl"))

FEATURE_NAMES = [
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

# ---------------------------
# Request Schema
# ---------------------------
class VendorInput(BaseModel):
    avg_monthly_sales: float
    sales_variance: float
    repayment_history: float
    late_payments: int
    years_active: int
    transaction_count: int
    customer_rating: float
    dispute_count: int
    outstanding_loans: int
    gst_compliance: int


# ---------------------------
# Prediction Endpoint
# ---------------------------
@app.post("/predict")
def predict(input_data: VendorInput):

    # Convert input to numpy array
    features = np.array([[getattr(input_data, f) for f in FEATURE_NAMES]])

    # ---- Trust Score Prediction ----
    trust_score = float(trust_model.predict(features)[0])
    credit_points = int(trust_score * 100)

    # ---- Risk Prediction ----
    risk_encoded = int(risk_model.predict(features)[0])
    risk_level = label_encoder.inverse_transform([risk_encoded])[0]

    # ---- Risk Confidence ----
    risk_probs = risk_model.predict_proba(features)[0]
    confidence = round(float(max(risk_probs)), 2)

    # ---- Feature Importance (Top 3) ----
    importances = trust_model.feature_importances_
    top_features = sorted(
        zip(FEATURE_NAMES, importances),
        key=lambda x: x[1],
        reverse=True
    )[:3]

    top_factors = [f[0] for f in top_features]

    # ---------------------------
    # FINAL DECISION LOGIC
    # ---------------------------
    if risk_level == "High":
        loan_decision = "Reject"
    elif risk_level == "Medium":
        loan_decision = "Review"
    else:  # Low risk
        if trust_score >= 55:
            loan_decision = "Approve"
        else:
            loan_decision = "Review"

    # ---------------------------
    # Response
    # ---------------------------
    return {
        "trust_score": round(trust_score, 2),
        "credit_points": credit_points,
        "risk_level": risk_level,
        "loan_decision": loan_decision,
        "confidence": confidence,
        "top_factors": top_factors
    }


# ---------------------------
# Health Check
# ---------------------------
@app.get("/")
def health():
    return {"status": "ML API is running"}
