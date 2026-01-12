from pydantic import BaseModel
from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, Field

class TrustScoreRequest(BaseModel):
    avg_monthly_sales: float = Field(..., ge=10000, le=10_000_000)
    sales_variance: float = Field(..., ge=0, le=100)
    repayment_history: float = Field(..., ge=0, le=100)
    outstanding_loans: float = Field(..., ge=0, le=50_000_000)
    years_active: float = Field(..., ge=0, le=50)


class VendorCreate(BaseModel):
    name: str
    gst_number: str
    credit_points: int = 500

class VendorResponse(BaseModel):
    id: UUID
    name: str
    gst_number: str
    trust_score: float
    credit_points: int
    risk_level: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class PredictionRequest(BaseModel):
    credit_points: int
    vendor_age_days: int = 30

class PredictionResponse(BaseModel):
    trust_score: float
    risk_level: str