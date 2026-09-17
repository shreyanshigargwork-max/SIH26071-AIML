import { useEffect, useState } from "react";

function Dashboard() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=26.9124&longitude=75.7873&current=temperature_2m,relative_humidity_2m,rain,pressure_msl,wind_speed_10m"
        );

        if (!response.ok) {
          throw new Error("Weather API failed");
        }

        const data = await response.json();
        setWeather(data.current);
      } catch (err) {
        console.error("Weather error:", err);
      }
    };

    getWeather();
  }, []);

  const getPrediction = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          temperature: weather?.temperature_2m ?? 28,
          humidity: weather?.relative_humidity_2m ?? 75,
          rainfall: weather?.rain ?? 42,
          pressure: weather?.pressure_msl ?? 1010,
          wind_speed: weather?.wind_speed_10m ?? 10,
          rainfall_3h: weather?.rain ?? 20,
          rainfall_6h: weather?.rain ?? 30,
          rainfall_12h: weather?.rain ?? 38,
          rainfall_24h: weather?.rain ?? 42,
          hour: new Date().getHours(),
          day_of_week: new Date().getDay(),
          month: new Date().getMonth() + 1,
          latitude: 26.9124,
          longitude: 75.7873,
        }),
      });

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError("Could not connect to the ML API.");
    } finally {
      setLoading(false);
    }
  };

  const currentRain = weather?.rain ?? 0;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Flood & Rainfall Monitoring Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Monitor rainfall conditions and flood-risk information.
        </p>
      </div>

      {/* Location */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <p className="text-sm text-slate-500">Current Location</p>

        <h2 className="text-xl font-semibold text-slate-800 mt-1">
          📍 Jaipur, Rajasthan
        </h2>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
        {/* Rainfall */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-sm text-slate-500">🌧️ Rainfall</p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {weather ? `${weather.rain} mm` : "Loading..."}
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Current rainfall
          </p>
        </div>

        {/* Rain Prediction */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-sm text-slate-500">
            🌊 Rain Prediction
          </p>

          <h2 className="text-3xl font-bold text-orange-500 mt-2">
            {prediction ? prediction.rain_prediction : "Not tested"}
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            ML model result
          </p>

          {prediction && (
            <p className="text-sm font-medium text-blue-600 mt-2">
              Predicted rainfall: {prediction.predicted_rainfall_mm} mm
            </p>
          )}
        </div>

        {/* Temperature */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-sm text-slate-500">
            🌡️ Temperature
          </p>

          <h2 className="text-3xl font-bold text-slate-800 mt-2">
            {weather ? `${weather.temperature_2m}°C` : "Loading..."}
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Current weather
          </p>
        </div>

        {/* Dynamic Alerts */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-sm text-slate-500">
            🚨 Active Alerts
          </p>

          <h2 className="text-3xl font-bold text-red-500 mt-2">
            {currentRain > 10 ? 2 : 0}
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Based on current rainfall
          </p>
        </div>
      </div>

      {/* Current Weather */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <h2 className="text-xl font-semibold text-slate-800">
          🌦️ Current Weather
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
          <div className="border rounded-lg p-4">
            <p className="text-sm text-slate-500">
              Humidity
            </p>

            <p className="text-2xl font-bold text-blue-600 mt-2">
              {weather
                ? `${weather.relative_humidity_2m}%`
                : "Loading..."}
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-sm text-slate-500">
              Pressure
            </p>

            <p className="text-2xl font-bold text-slate-800 mt-2">
              {weather
                ? `${weather.pressure_msl} hPa`
                : "Loading..."}
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-sm text-slate-500">
              Wind Speed
            </p>

            <p className="text-2xl font-bold text-slate-800 mt-2">
              {weather
                ? `${weather.wind_speed_10m} km/h`
                : "Loading..."}
            </p>
          </div>
        </div>
      </div>

      {/* AI Prediction */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <h2 className="text-xl font-semibold text-slate-800">
          🤖 AI Rainfall Prediction
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Send current weather data to the trained ML model.
        </p>

        <button
          onClick={getPrediction}
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg mt-4 hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Predicting..." : "Run Prediction"}
        </button>

        {prediction && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
            <div className="border rounded-lg p-4">
              <p className="text-sm text-slate-500">
                Rain Prediction
              </p>

              <p className="text-2xl font-bold text-blue-600 mt-2">
                {prediction.rain_prediction}
              </p>

              <p className="text-sm text-slate-500 mt-2">
                ML classification result
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-sm text-slate-500">
                Predicted Rainfall
              </p>

              <p className="text-2xl font-bold text-blue-600 mt-2">
                {prediction.predicted_rainfall_mm} mm
              </p>

              <p className="text-sm text-slate-500 mt-2">
                Expected rainfall value
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mt-4">
            {error}
          </div>
        )}
      </div>

      {/* Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Rainfall Status */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-slate-800">
            🌧️ Rainfall Status
          </h2>

          <div className="flex justify-between mt-5 mb-2">
            <span className="text-sm text-slate-500">
              Current rainfall
            </span>

            <span className="text-sm font-semibold text-blue-600">
              {weather ? `${weather.rain} mm` : "Loading..."}
            </span>
          </div>

          <div className="w-full bg-slate-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full"
              style={{
                width: `${Math.min(currentRain * 5, 100)}%`,
              }}
            ></div>
          </div>

          <p className="text-sm text-slate-500 mt-3">
            Rainfall conditions are being monitored continuously.
          </p>
        </div>

        {/* Flood Risk Status */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-slate-800">
            🌊 Flood Risk Status
          </h2>

          <p className="text-sm text-slate-500 mt-5">
            Current Monitoring Status
          </p>

          <p className="text-3xl font-bold text-orange-500 mt-2">
            Monitoring
          </p>

          <p className="text-sm text-slate-500 mt-4">
            Flood-risk visualization is available in the Map section.
          </p>
        </div>
      </div>

      {/* Map Preview */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <h2 className="text-xl font-semibold text-slate-800">
          🗺️ Flood Risk Map
        </h2>

        <div className="h-72 bg-slate-200 rounded-xl mt-4 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-3">
              🗺️
            </div>

            <p className="text-slate-600 font-medium">
              Interactive flood-risk map
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Open the Map section for detailed visualization.
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Alerts */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <h2 className="text-xl font-semibold text-slate-800">
          🚨 Current Alerts
        </h2>

        <div className="space-y-3 mt-4">
          {weather && weather.rain > 10 ? (
            <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
              <div className="flex justify-between">
                <p className="font-semibold text-slate-800">
                  Heavy Rainfall Alert
                </p>

                <span className="text-sm font-medium text-red-600">
                  High
                </span>
              </div>

              <p className="text-sm text-slate-500 mt-1">
                Current rainfall is above the monitoring threshold.
              </p>

              <p className="text-xs text-slate-400 mt-2">
                Current rainfall: {weather.rain} mm
              </p>
            </div>
          ) : (
            <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
              <div className="flex justify-between">
                <p className="font-semibold text-slate-800">
                  Normal Weather Conditions
                </p>

                <span className="text-sm font-medium text-green-600">
                  Normal
                </span>
              </div>

              <p className="text-sm text-slate-500 mt-1">
                No heavy rainfall alert is currently detected.
              </p>

              <p className="text-xs text-slate-400 mt-2">
                Current rainfall: {currentRain} mm
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;