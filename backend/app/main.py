from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine
from app import models
from app.routes.vendors import router as vendors_router

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="CredAI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(vendors_router)

@app.get("/")
def root():
    return {"message": "Backend running successfully"}
