from pydantic import BaseModel
from datetime import datetime
from uuid import UUID

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