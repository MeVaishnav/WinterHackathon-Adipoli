from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from app.services.google_context import get_financial_context

router = APIRouter(
    prefix="/trust-score",
    tags=["Trust Score Insights"]
)

class TrustScoreInput(BaseModel):
    score: float
    user_behavior: Optional[str] = None  # optional description if available


@router.post("/explanation")
async def explain_score(payload: TrustScoreInput):
    """
    Explains why a user might have received a certain trust score
    using simple rule-based interpretation + external financial context.
    """
    score = payload.score

    # Minimal internal interpretation (non-breaking)
    if score >= 80:
        internal_reason = "Strong financial stability and consistent banking activity."
    elif score >= 50:
        internal_reason = "Moderate activity with occasional financial irregularities."
    else:
        internal_reason = "High-risk behavior or insufficient financial background."

    # Optional external insights
    external_context = get_financial_context("why trust score matters")

    return {
        "score": score,
        "internal_reason": internal_reason,
        "external_context": external_context,
        "source": "internal+google"
    }


@router.post("/improvement")
async def improve_score(payload: TrustScoreInput):
    """
    Suggests how a user could improve their trust score,
    enhanced with optional external financial best-practice context.
    """
    score = payload.score

    # Minimal internal recommendations
    if score >= 80:
        improvements = ["Maintain current banking habits"]
    elif score >= 50:
        improvements = [
            "Ensure regular income deposits",
            "Avoid frequent low-balance warnings",
            "Reduce bounced or delayed payments"
        ]
    else:
        improvements = [
            "Increase stable monthly income",
            "Avoid negative balance incidents",
            "Build longer financial activity history"
        ]

    external_context = get_financial_context("how to improve credit score")

    return {
        "score": score,
        "recommended_actions": improvements,
        "external_context": external_context,
        "source": "internal+google"
    }
