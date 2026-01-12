from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
print("DATABASE_URL =", DATABASE_URL)

# ---------------------------------------------
# ⚠️ IMPORTANT: DO NOT CONNECT IMMEDIATELY
# Lazy engine creation only
# ---------------------------------------------
engine = None

def get_engine():
    global engine
    if engine is None:
        engine = create_engine(DATABASE_URL, pool_pre_ping=True)
    return engine

# ---------------------------------------------
# Session factory (created only when needed)
# ---------------------------------------------
def get_session():
    eng = get_engine()
    SessionLocal = sessionmaker(
        autocommit=False,
        autoflush=False,
        bind=eng
    )
    return SessionLocal

Base = declarative_base()

# ---------------------------------------------
# Dependency used in route handlers
# ---------------------------------------------
def get_db():
    SessionLocal = get_session()
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
