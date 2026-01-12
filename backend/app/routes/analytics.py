from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from ..database import get_db
from ..models import Vendor

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("/summary")
def get_analytics_summary(db: Session = Depends(get_db)):
    total_vendors = db.query(func.count(Vendor.id)).scalar()
    avg_trust_score = db.query(func.avg(Vendor.trust_score)).scalar() or 0
    
    risk_distribution = db.query(
        Vendor.risk_level,
        func.count(Vendor.id)
    ).group_by(Vendor.risk_level).all()
    
    risk_dict = {risk: count for risk, count in risk_distribution}
    
    return {
        "total_vendors": total_vendors,
        "average_trust_score": round(avg_trust_score, 2),
        "risk_distribution": {
            "Low": risk_dict.get("Low", 0),
            "Medium": risk_dict.get("Medium", 0),
            "High": risk_dict.get("High", 0)
        }
    }