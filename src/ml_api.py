from fastapi import FastAPI
from pydantic import BaseModel

from .predict import predict_weather

app = FastAPI(
    title="SIH26071 Weather ML API",
    description="Rain and next-hour rainfall prediction API",
    version="1.0"
)


class WeatherInput(BaseModel):
    temperature: float
    humidity: float
    rainfall: float
    pressure: float
    wind_speed: float
    rainfall_3h: float
    rainfall_6h: float
    rainfall_12h: float
    rainfall_24h: float
    hour: int
    day_of_week: int
    month: int
    latitude: float
    longitude: float


@app.get("/")
def home():
    return {
        "message": "SIH26071 ML API is running"
    }


@app.post("/predict")
def predict(input_data: WeatherInput):

    data = input_data.model_dump()

    result = predict_weather(data)

    return {
        "rain_prediction": (
            "RAIN" if result["rain_flag"] == 1 else "NO RAIN"
        ),
        "rain_flag": result["rain_flag"],
        "predicted_rainfall_mm": result["predicted_rainfall_mm"]
    }