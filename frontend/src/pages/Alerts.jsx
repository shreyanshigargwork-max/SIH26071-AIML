import { useEffect, useState } from "react";

function Alerts() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } catch (error) {
        console.error("Weather error:", error);
      } finally {
        setLoading(false);
      }
    };

    getWeather();
  }, []);

  const currentRain = weather?.rain ?? 0;

  let alertLevel = "Normal";
  let alertColor = "green";
  let alertCount = 0;

  if (currentRain > 30) {
    alertLevel = "High";
    alertColor = "red";
    alertCount = 1;
  } else if (currentRain > 10) {
    alertLevel = "Moderate";
    alertColor = "orange";
    alertCount = 1;
  }

  return (
    <div>
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Flood Alerts
        </h1>

        <p className="text-slate-500 mt-2">
          Monitor important rainfall and flood-risk notifications.
        </p>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-sm text-slate-500">
            🚨 High Alerts
          </p>

          <p className="text-3xl font-bold text-red-500 mt-2">
            {alertLevel === "High" ? 1 : 0}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-sm text-slate-500">
            ⚠️ Moderate Alerts
          </p>

          <p className="text-3xl font-bold text-orange-500 mt-2">
            {alertLevel === "Moderate" ? 1 : 0}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-sm text-slate-500">
            ℹ️ Information
          </p>

          <p className="text-3xl font-bold text-blue-500 mt-2">
            1
          </p>
        </div>
      </div>

      {/* Current Alert */}
      <div className="space-y-5">

        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-slate-500">
              Loading current weather conditions...
            </p>
          </div>
        ) : currentRain > 30 ? (
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-800">
                🚨 Heavy Rainfall Alert
              </h2>

              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium w-fit">
                High
              </span>
            </div>

            <p className="text-slate-500 mt-3">
              Current rainfall is above the high monitoring threshold.
              Continue monitoring weather conditions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4 text-sm text-slate-400">
              <span>📍 Jaipur, Rajasthan</span>

              <span>
                🌧️ Current Rainfall: {currentRain} mm
              </span>
            </div>
          </div>
        ) : currentRain > 10 ? (
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-500">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-800">
                ⚠️ Moderate Rainfall Alert
              </h2>

              <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium w-fit">
                Moderate
              </span>
            </div>

            <p className="text-slate-500 mt-3">
              Current rainfall indicates moderate monitoring conditions
              in the monitored region.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4 text-sm text-slate-400">
              <span>📍 Jaipur, Rajasthan</span>

              <span>
                🌧️ Current Rainfall: {currentRain} mm
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-800">
                ✅ Normal Weather Conditions
              </h2>

              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium w-fit">
                Normal
              </span>
            </div>

            <p className="text-slate-500 mt-3">
              No heavy rainfall alert is currently detected.
              Weather monitoring is active.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4 text-sm text-slate-400">
              <span>📍 Jaipur, Rajasthan</span>

              <span>
                🌧️ Current Rainfall: {currentRain} mm
              </span>
            </div>
          </div>
        )}

        {/* Information Alert */}
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-xl font-semibold text-slate-800">
              🌧️ Rainfall Monitoring Active
            </h2>

            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium w-fit">
              Info
            </span>
          </div>

          <p className="text-slate-500 mt-3">
            Weather and rainfall conditions are currently being
            monitored by the system.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 text-sm text-slate-400">
            <span>📍 Jaipur, Rajasthan</span>

            <span>🟢 Monitoring Active</span>
          </div>
        </div>
      </div>

      {/* Current Weather */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <h2 className="text-xl font-semibold text-slate-800">
          🌦️ Current Weather
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          <div className="border rounded-lg p-4">
            <p className="text-sm text-slate-500">
              Rainfall
            </p>

            <p className="text-2xl font-bold text-blue-600 mt-2">
              {loading ? "Loading..." : `${currentRain} mm`}
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-sm text-slate-500">
              Temperature
            </p>

            <p className="text-2xl font-bold text-slate-800 mt-2">
              {loading
                ? "Loading..."
                : `${weather?.temperature_2m}°C`}
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-sm text-slate-500">
              Humidity
            </p>

            <p className="text-2xl font-bold text-blue-600 mt-2">
              {loading
                ? "Loading..."
                : `${weather?.relative_humidity_2m}%`}
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-sm text-slate-500">
              Wind Speed
            </p>

            <p className="text-2xl font-bold text-slate-800 mt-2">
              {loading
                ? "Loading..."
                : `${weather?.wind_speed_10m} km/h`}
            </p>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <h2 className="text-xl font-semibold text-slate-800">
          🛰️ Monitoring System Status
        </h2>

        <div className="mt-5 flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>

          <p className="font-medium text-green-600">
            System Monitoring Active
          </p>
        </div>

        <p className="text-sm text-slate-500 mt-3">
          Live weather information is being monitored for
          rainfall and flood-risk awareness.
        </p>

        <p className="text-sm text-slate-400 mt-2">
          Current alert level: {loading ? "Loading..." : alertLevel}
        </p>
      </div>
    </div>
  );
}

export default Alerts;