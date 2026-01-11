from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Vendor

router = APIRouter(prefix="/vendors", tags=["Vendors"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def get_vendors(db: Session = Depends(get_db)):
    return db.query(Vendor).all()

@router.post("/")
def create_vendor(name: str, gst_number: str, db: Session = Depends(get_db)):
    vendor = Vendor(name=name, gst_number=gst_number)
    db.add(vendor)
    db.commit()
    db.refresh(vendor)
    return vendor
