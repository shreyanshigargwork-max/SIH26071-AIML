import { useState } from "react";

function Dashboard() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
          temperature: 28,
          humidity: 75,
          rainfall: 42,
          pressure: 1010,
          wind_speed: 10,
          rainfall_3h: 20,
          rainfall_6h: 30,
          rainfall_12h: 38,
          rainfall_24h: 42,
          hour: 12,
          day_of_week: 3,
          month: 9,
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
        <p className="text-sm text-slate-500">
          Current Location
        </p>

        <h2 className="text-xl font-semibold text-slate-800 mt-1">
          📍 Jaipur, Rajasthan
        </h2>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">

        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-sm text-slate-500">
            🌧️ Rainfall
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            42 mm
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Last 24 hours
          </p>
        </div>

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
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-sm text-slate-500">
            🌡️ Temperature
          </p>

          <h2 className="text-3xl font-bold text-slate-800 mt-2">
            28°C
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Current weather
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-sm text-slate-500">
            🚨 Active Alerts
          </p>

          <h2 className="text-3xl font-bold text-red-500 mt-2">
            2
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Requires attention
          </p>
        </div>

      </div>

      {/* AI Prediction */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">

        <h2 className="text-xl font-semibold text-slate-800">
          🤖 AI Rainfall Prediction
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Send weather data to the trained ML model.
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
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-sm text-slate-500">
                Predicted Rainfall
              </p>

              <p className="text-2xl font-bold text-blue-600 mt-2">
                {prediction.predicted_rainfall_mm} mm
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

      {/* Monitoring Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

        <div className="bg-white rounded-xl shadow-sm p-6">

          <h2 className="text-xl font-semibold text-slate-800">
            🌧️ Rainfall Status
          </h2>

          <div className="flex justify-between mt-5 mb-2">
            <span className="text-sm text-slate-500">
              Current rainfall
            </span>

            <span className="text-sm font-semibold text-blue-600">
              42 mm
            </span>
          </div>

          <div className="w-full bg-slate-200 rounded-full h-3">
            <div className="bg-blue-500 h-3 rounded-full w-[65%]"></div>
          </div>

          <p className="text-sm text-slate-500 mt-3">
            Rainfall conditions are being monitored continuously.
          </p>

        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">

          <h2 className="text-xl font-semibold text-slate-800">
            🌊 Flood Risk Status
          </h2>

          <p className="text-sm text-slate-500 mt-5">
            Current Risk Level
          </p>

          <p className="text-3xl font-bold text-orange-500 mt-2">
            {prediction ? prediction.rain_prediction : "Moderate"}
          </p>

          <p className="text-sm text-slate-500 mt-4">
            Monitor rainfall and flood-risk conditions for changes.
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

      {/* Recent Alerts */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">

        <h2 className="text-xl font-semibold text-slate-800">
          🚨 Recent Alerts
        </h2>

        <div className="space-y-3 mt-4">

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
              Heavy rainfall has been detected.
            </p>

          </div>

          <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded">

            <div className="flex justify-between">

              <p className="font-semibold text-slate-800">
                Moderate Flood Risk
              </p>

              <span className="text-sm font-medium text-orange-600">
                Moderate
              </span>

            </div>

            <p className="text-sm text-slate-500 mt-1">
              Current rainfall levels indicate moderate flood-risk conditions.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;