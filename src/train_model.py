import pandas as pd
import joblib
from pathlib import Path

from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    classification_report,
    confusion_matrix
)

# =========================
# 1. Project Paths
# =========================

BASE_DIR = Path(__file__).resolve().parents[1]

DATA_PATH = BASE_DIR / "data" / "processed" / "ml_classification_handoff.csv"
MODEL_PATH = BASE_DIR / "models" / "rain_classification_model.pkl"


# =========================
# 2. Load Dataset
# =========================

df = pd.read_csv(DATA_PATH)

print("Dataset loaded successfully!")
print("Dataset shape:", df.shape)


# =========================
# 3. Features and Target
# =========================

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

target = "rain_next_1h_flag"

X = df[features]
y = df[target]


print("\nFeatures:")
print(features)

print("\nTarget:")
print(target)

print("\nClass Distribution:")
print(y.value_counts())


# =========================
# 4. Chronological Train-Test Split
# =========================

split_index = int(len(df) * 0.80)

X_train = X.iloc[:split_index]
X_test = X.iloc[split_index:]

y_train = y.iloc[:split_index]
y_test = y.iloc[split_index:]

print("\nTraining data:", X_train.shape)
print("Testing data:", X_test.shape)


# =========================
# 5. Train Random Forest
# =========================

classifier = RandomForestClassifier(
    n_estimators=300,
    random_state=42,
    class_weight="balanced",
    n_jobs=-1
)

classifier.fit(X_train, y_train)

print("\nRain/No-Rain classification model trained successfully!")


# =========================
# 6. Predictions
# =========================

y_pred = classifier.predict(X_test)


# =========================
# 7. Evaluation
# =========================

accuracy = accuracy_score(y_test, y_pred)

precision = precision_score(
    y_test,
    y_pred,
    zero_division=0
)

recall = recall_score(
    y_test,
    y_pred,
    zero_division=0
)

f1 = f1_score(
    y_test,
    y_pred,
    zero_division=0
)


print("\n========== MODEL EVALUATION ==========")

print("Accuracy :", round(accuracy, 4))
print("Precision:", round(precision, 4))
print("Recall   :", round(recall, 4))
print("F1 Score :", round(f1, 4))

print("\nClassification Report:")
print(
    classification_report(
        y_test,
        y_pred,
        zero_division=0
    )
)

print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))


# =========================
# 8. Save Model
# =========================

joblib.dump(classifier, MODEL_PATH)

print("\nModel saved successfully!")
print("Saved at:", MODEL_PATH)