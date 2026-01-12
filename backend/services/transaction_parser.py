import pandas as pd
import re

def parse_transactions(text):
    data = []
    lines = text.split("\n")

    for line in lines:
        match = re.search(r"(\d{2}/\d{2}/\d{4}).*?(\d+\.\d{2})?\s?(\d+\.\d{2})?\s?(\d+\.\d{2})", line)
        if match:
            data.append({
                "date": match.group(1),
                "credit": float(match.group(2)) if match.group(2) else 0,
                "debit": float(match.group(3)) if match.group(3) else 0,
                "balance": float(match.group(4))
            })

    return pd.DataFrame(data)
