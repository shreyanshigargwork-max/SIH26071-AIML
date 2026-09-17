import pandas as pd
import numpy as np
import joblib

from pathlib import Path
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score


BASE_DIR = Path(__file__).resolve().parents[1]

DATA_PATH = BASE_DIR / "data" / "processed" / "ml_handoff.csv"
MODEL_PATH = BASE_DIR / "models" / "rainfall_next_1h_model.pkl"


# Load dataset
df = pd.read_csv(DATA_PATH)

print("Dataset Shape:", df.shape)


# Features and target
target = "rainfall_next_1h"

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

X = df[features]
y = df[target]


# Chronological 80/20 split
split_index = int(len(df) * 0.80)

X_train = X.iloc[:split_index]
X_test = X.iloc[split_index:]

y_train = y.iloc[:split_index]
y_test = y.iloc[split_index:]


print("Training Samples:", len(X_train))
print("Testing Samples:", len(X_test))


# Log transformation
y_train_log = np.log1p(y_train)


# Train model
model = RandomForestRegressor(
    n_estimators=300,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train_log)


# Prediction
y_pred_log = model.predict(X_test)

y_pred = np.expm1(y_pred_log)

y_pred = np.maximum(y_pred, 0)


# Evaluation
mae = mean_absolute_error(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2 = r2_score(y_test, y_pred)


print("\nModel Performance")
print("=================")
print(f"MAE  : {mae:.4f} mm")
print(f"RMSE : {rmse:.4f} mm")
print(f"R2   : {r2:.4f}")


# Save model
joblib.dump(model, MODEL_PATH)

print("\nModel saved successfully:")
print(MODEL_PATH)