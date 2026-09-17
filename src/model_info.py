MODEL_INFO = {
    "project": "SIH26071 Weather Prediction",
    
    "models": {
        "rain_classification": {
            "file": "models/rain_classification_model.pkl",
            "task": "Rain / No-Rain Classification",
            "target": "rain_next_1h_flag",
            "classes": {
                "0": "No Rain",
                "1": "Rain"
            }
        },
        
        "rainfall_regression": {
            "file": "models/rainfall_next_1h_model.pkl",
            "task": "Next-Hour Rainfall Prediction",
            "target": "rainfall_next_1h",
            "unit": "mm"
        }
    },

    "features": [
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
    ],

    "data_source": "Open-Meteo Historical Weather API",
    "location": "Jaipur, Rajasthan, India",
    "timezone": "Asia/Kolkata",
    "prototype_period": "July-August 2026"
}


if __name__ == "__main__":
    print("SIH26071 ML Model Information")
    print("============================")
    print("Project:", MODEL_INFO["project"])
    print("Models:", list(MODEL_INFO["models"].keys()))
    print("Features:", len(MODEL_INFO["features"]))