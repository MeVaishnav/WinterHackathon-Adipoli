from flask import Blueprint, request, jsonify
from services.phonepe_parser import parse_phonepe_pdf
from services.feature_engine import extract_features
from services.trust_score import calculate_trust_score

upload_bp = Blueprint("upload", __name__)

@upload_bp.route("/upload-statement", methods=["POST"])
def upload_statement():
    pdf = request.files["statement"]
    password = request.form["password"]

    transactions = parse_phonepe_pdf(pdf, password)
    features = extract_features(transactions)
    trust_score = calculate_trust_score(features)

    return jsonify({
        "features": features,
        "trust_score": trust_score
    })