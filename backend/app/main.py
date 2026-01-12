from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routes import vendors, analytics
from .ml.risk_model import predict_risk

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="CredAI API", version="1.0.0")

# CORS (hackathon-safe)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(vendors.router)
app.include_router(analytics.router)

@app.get("/")
def root():
    return {"message": "CredAI backend running 🚀"}

@app.post("/ml/predict")
def ml_predict(credit_points: int, vendor_age_days: int = 30):
    return predict_risk(credit_points, vendor_age_days)
