import os
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from xgboost import XGBRegressor, XGBClassifier
import joblib

# Resolve paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data", "vendor_data.csv")
MODEL_DIR = os.path.join(BASE_DIR, "models")

os.makedirs(MODEL_DIR, exist_ok=True)

# Load dataset
df = pd.read_csv(DATA_PATH)

# Encode risk labels
label_encoder = LabelEncoder()
df["risk_encoded"] = label_encoder.fit_transform(df["risk_label"])

# Features and targets
X = df.drop(["trust_score", "risk_label", "risk_encoded"], axis=1)
y_score = df["trust_score"]
y_risk = df["risk_encoded"]

# Train Trust Score model (FULL DATA)
trust_model = XGBRegressor(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=4,
    random_state=42
)
trust_model.fit(X, y_score)

# Train Risk model (FULL DATA)
risk_model = XGBClassifier(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=4,
    objective="multi:softprob",
    num_class=len(label_encoder.classes_),
    eval_metric="mlogloss",
    random_state=42
)
risk_model.fit(X, y_risk)

# Save models
joblib.dump(trust_model, os.path.join(MODEL_DIR, "trust_score_model.pkl"))
joblib.dump(risk_model, os.path.join(MODEL_DIR, "risk_model.pkl"))
joblib.dump(label_encoder, os.path.join(MODEL_DIR, "risk_label_encoder.pkl"))

print("Models trained and saved successfully")
