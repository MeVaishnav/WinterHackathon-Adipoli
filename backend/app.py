from fastapi import FastAPI, UploadFile, File
import shutil
from services.pdf_extractor import extract_text
from services.transaction_parser import parse_transactions
from services.score_calculator import calculate_score

app = FastAPI()

@app.post("/analyze")
async def analyze_bank_statement(file: UploadFile = File(...)):
    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = extract_text(file_path)
    df = parse_transactions(text)
    result = calculate_score(df)

    return result
