import joblib
import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]

model = joblib.load(
    BASE_DIR / "models" / "rain_classification_model.pkl"
)

features = [
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

importance = model.feature_importances_

result = pd.DataFrame({
    "Feature": features,
    "Importance": importance
})

result = result.sort_values(
    by="Importance",
    ascending=False
)

print("\nFeature Importance")
print("==================")

for _, row in result.iterrows():
    print(f"{row['Feature']:15} : {row['Importance']:.4f}")