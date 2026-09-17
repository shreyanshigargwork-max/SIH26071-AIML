# SIH26071 ML API Handoff

## ML API

Framework: FastAPI

API File:
src/ml_api.py

Local API:
http://127.0.0.1:8000

Swagger:
http://127.0.0.1:8000/docs


## Prediction Endpoint

Method:

POST

Endpoint:

/predict


## Input Features

The API requires these 14 fields:

- temperature
- humidity
- rainfall
- pressure
- wind_speed
- rainfall_3h
- rainfall_6h
- rainfall_12h
- rainfall_24h
- hour
- day_of_week
- month
- latitude
- longitude


## Example Request

{
    "temperature": 27,
    "humidity": 80,
    "rainfall": 3,
    "pressure": 1000,
    "wind_speed": 12,
    "rainfall_3h": 5,
    "rainfall_6h": 8,
    "rainfall_12h": 12,
    "rainfall_24h": 18,
    "hour": 16,
    "day_of_week": 3,
    "month": 8,
    "latitude": 26.9124,
    "longitude": 75.7873
}


## Example Response

{
    "rain_prediction": "RAIN",
    "rain_flag": 1,
    "predicted_rainfall_mm": 1.07
}


## Response Fields

rain_prediction:
RAIN or NO RAIN

rain_flag:
0 = No Rain
1 = Rain

predicted_rainfall_mm:
Predicted rainfall for the next hour in millimetres.


## ML Models

Rain Classification:

models/rain_classification_model.pkl

Rainfall Regression:

models/rainfall_next_1h_model.pkl


## How to Run the API

From the project root:

python -m uvicorn src.ml_api:app --reload


## Important

The current ML module predicts:

1. Rain / No-Rain
2. Next-hour rainfall amount

It is currently a prototype and does not directly provide a real flood/inundation prediction.