from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from datetime import datetime

from ..database import get_db
from ..models import Vendor
from ..schemas import VendorCreate, VendorResponse
from ..ml.risk_model import predict_risk

router = APIRouter(prefix="/vendors", tags=["vendors"])

@router.post("/", response_model=VendorResponse)
def create_vendor(vendor: VendorCreate, db: Session = Depends(get_db)):
    # Check if GST exists
    existing = db.query(Vendor).filter(Vendor.gst_number == vendor.gst_number).first()
    if existing:
        raise HTTPException(status_code=400, detail="GST number already exists")
    
    # Calculate trust score and risk
    prediction = predict_risk(vendor.credit_points, 30)
    
    # Create vendor
    db_vendor = Vendor(
        name=vendor.name,
        gst_number=vendor.gst_number,
        credit_points=vendor.credit_points,
        trust_score=prediction["trust_score"],
        risk_level=prediction["risk_level"]
    )
    
    db.add(db_vendor)
    db.commit()
    db.refresh(db_vendor)
    
    return db_vendor

@router.get("/", response_model=List[VendorResponse])
def get_vendors(db: Session = Depends(get_db)):
    vendors = db.query(Vendor).all()
    return vendors

@router.get("/{vendor_id}", response_model=VendorResponse)
def get_vendor(vendor_id: UUID, db: Session = Depends(get_db)):
    vendor = db.query(Vendor).filter(Vendor.id == vendor_id).first()
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")
    return vendor