# SIH26071 - Machine Learning Model Report

## 1. Role

Role: AI/ML Developer

Responsibilities:
- Weather data analysis
- Rain / No-Rain classification
- Next-hour rainfall prediction
- Model training and testing
- Model evaluation
- ML model integration through API


## 2. Dataset

Data Source:
Open-Meteo Historical Weather API

Location:
Jaipur, Rajasthan, India

Prototype Period:
July-August 2026

Dataset Records:
1464 records for rainfall regression

Classification Records:
1463 records

Missing Values:
0


## 3. Input Features

The ML models use the following 14 features:

1. temperature
2. humidity
3. rainfall
4. pressure
5. wind_speed
6. rainfall_3h
7. rainfall_6h
8. rainfall_12h
9. rainfall_24h
10. hour
11. day_of_week
12. month
13. latitude
14. longitude


## 4. Rain / No-Rain Classification

Target:

rain_next_1h_flag

Classes:

0 = No Rain
1 = Rain

Model:

Random Forest Classifier

Configuration:

- Number of trees: 300
- Random state: 42
- Class weight: balanced
- Train/Test split: 80/20
- Split type: Chronological


### Classification Results

Accuracy: 88.05%

Precision: 45.71%

Recall: 50.00%

F1 Score: 47.76%


### Confusion Matrix

True Negatives: 242
False Positives: 19
False Negatives: 16
True Positives: 16


### Important Note

The dataset contains more No-Rain observations than Rain observations.

Therefore, accuracy alone should not be used to judge the model.

Precision, Recall and F1 Score are also considered for the Rain class.


## 5. Next-Hour Rainfall Prediction

Target:

rainfall_next_1h

Unit:

millimetres (mm)

Model:

Random Forest Regressor

Training approach:

- Log1p transformation applied to the target
- 300 trees
- Random state: 42
- Chronological 80/20 split


### Regression Results

MAE: 0.0821 mm

RMSE: 0.2768 mm

R²: 0.0111


### Interpretation

The model provides a prototype for next-hour rainfall prediction.

The relatively low R² indicates that the current dataset and feature set do not explain most of the variation in rainfall intensity.

Therefore, the model should be treated as a baseline/prototype rather than a highly accurate rainfall forecasting system.


## 6. Feature Importance

The Random Forest classification model produced the following feature importance values:

| Feature | Importance |
|---------|------------|
| rainfall | 0.1750 |
| rainfall_3h | 0.1138 |
| rainfall_24h | 0.0977 |
| rainfall_6h | 0.0940 |
| hour | 0.0806 |
| wind_speed | 0.0804 |
| temperature | 0.0797 |
| rainfall_12h | 0.0777 |
| pressure | 0.0775 |
| humidity | 0.0772 |
| day_of_week | 0.0358 |
| month | 0.0106 |
| latitude | 0.0000 |
| longitude | 0.0000 |


## 7. Saved ML Models

The trained models are stored inside the models directory:

- rain_classification_model.pkl
- rainfall_next_1h_model.pkl


## 8. Prediction Module

Prediction logic is implemented in:

src/predict.py

The module loads both trained models and generates:

- Rain / No-Rain prediction
- Predicted next-hour rainfall in mm


## 9. ML API

The ML model is exposed through a FastAPI service.

API file:

src/ml_api.py

API endpoint:

POST /predict

Swagger documentation:

/docs


### API Output

The API returns:

- rain_prediction
- rain_flag
- predicted_rainfall_mm


Example:

{
    "rain_prediction": "RAIN",
    "rain_flag": 1,
    "predicted_rainfall_mm": 0.53
}


## 10. Project Structure

SIH26071-AIML/

├── data/

│   └── processed/

│       ├── ml_handoff.csv

│       └── ml_classification_handoff.csv

├── models/

│   ├── rain_classification_model.pkl

│   ├── rainfall_next_1h_model.pkl

│   └── flood_risk_model.pkl

├── notebooks/

│   ├── SIH26071_ML_Practice.ipynb

│   └── SIH26071_Real_ML.ipynb

└── src/

    ├── predict.py

    ├── ml_api.py

    ├── model_info.py

    ├── feature_importance.py

    └── train_regression.py


## 11. Important Limitation

The current ML handoff dataset directly supports:

1. Rain / No-Rain classification
2. Next-hour rainfall prediction

It does NOT directly contain a real flood/inundation target.

Therefore, the current rainfall models should not be described as a complete flood prediction model.

A future flood-risk model would require appropriate flood labels, water-level data, hydrological information, terrain/elevation data, or another documented flood-risk methodology.


## 12. Future Improvements

Possible improvements include:

- More historical weather data
- Additional geographical locations
- Satellite rainfall observations
- Radar/weather observations
- Water-level data
- Elevation and terrain information
- Flood event labels
- More advanced time-series models
- Hyperparameter tuning
- Better handling of rare heavy-rainfall events


## 13. Conclusion

The AI/ML module establishes a working prototype for weather-based rain detection and next-hour rainfall prediction.

The trained models can be accessed through the prediction module and FastAPI service, allowing the ML component to be integrated with the project's backend and frontend.