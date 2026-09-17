import joblib
import pandas as pd
import numpy as np
from pathlib import Path

# Project root
BASE_DIR = Path(__file__).resolve().parents[1]

# Load trained models
rainfall_model = joblib.load(
    BASE_DIR / "models" / "rainfall_next_1h_model.pkl"
)

classification_model = joblib.load(
    BASE_DIR / "models" / "rain_classification_model.pkl"
)

# Exact feature order used during training
FEATURES = [
    "temperature",
    "humidity",
    "rainfall",
    "pressure",
    "wind_speed",
    "rainfall_3h",
    "rainfall_6h",
    "rainfall_12h",
    "rainfall_24h",
    "hour",
    "day_of_week",
    "month",
    "latitude",
    "longitude"
]


def predict_weather(data):
    df = pd.DataFrame([data])

    # Ensure correct feature order
    df = df[FEATURES]

    # Rain / No-Rain prediction
    rain_flag = classification_model.predict(df)[0]

    # Next-hour rainfall prediction
    log_prediction = rainfall_model.predict(df)[0]
    rainfall_prediction = max(np.expm1(log_prediction), 0)

    return {
        "rain_flag": int(rain_flag),
        "predicted_rainfall_mm": round(float(rainfall_prediction), 2)
    }


# Test prediction
if __name__ == "__main__":

    sample_data = {
        "temperature": 28.0,
        "humidity": 85,
        "rainfall": 2.0,
        "pressure": 950.0,
        "wind_speed": 12.0,
        "rainfall_3h": 5.0,
        "rainfall_6h": 8.0,
        "rainfall_12h": 10.0,
        "rainfall_24h": 15.0,
        "hour": 15,
        "day_of_week": 3,
        "month": 8,
        "latitude": 26.9124,
        "longitude": 75.7873
    }

    result = predict_weather(sample_data)

    print("ML Prediction Result")
    print("--------------------")
    print("Rain Flag:", result["rain_flag"])
    print("Predicted Rainfall:", result["predicted_rainfall_mm"], "mm")