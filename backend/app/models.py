from sqlalchemy import Column, String, Float, Integer, DateTime
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid
from .database import Base

class Vendor(Base):
    __tablename__ = "vendors"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    gst_number = Column(String, unique=True, nullable=False)
    trust_score = Column(Float, default=0.0)
    credit_points = Column(Integer, default=0)
    risk_level = Column(String, default="Medium")
    created_at = Column(DateTime, default=datetime.utcnow)