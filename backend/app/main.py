from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routes import vendors, analytics
from .ml.risk_model import predict_risk
<<<<<<< HEAD
from .schemas import TrustScoreRequest
from .ml.risk_model import predict_risk
=======
from app.routes import trust_score


>>>>>>> 9c55a80d5e36dc4d7dfd5886b91b894701995a40


app = FastAPI(title="CredAI API", version="1.0.0")
app.include_router(trust_score.router)

# Create tables
#Base.metadata.create_all(bind=engine)

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
def ml_predict(payload: TrustScoreRequest):
    return predict_risk(payload.dict())