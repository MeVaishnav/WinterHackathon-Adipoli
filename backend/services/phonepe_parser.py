# backend/services/phonepe_parser.py

from pypdf import PdfReader
import re

def parse_phonepe_pdf(file, password):
    reader = PdfReader(file)
    if reader.is_encrypted:
        reader.decrypt(password)

    text = ""
    for page in reader.pages:
        text += page.extract_text()

    transactions = []

    blocks = text.split("Transaction ID")
    for block in blocks[1:]:
        amount = re.search(r"INR\s([\d,]+)", block)
        txn_type = "CREDIT" if "Credit" in block else "DEBIT"

        if amount:
            transactions.append({
                "amount": float(amount.group(1).replace(",", "")),
                "type": txn_type
            })

    return transactions