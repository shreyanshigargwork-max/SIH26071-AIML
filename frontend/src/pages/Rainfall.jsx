import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Rainfall() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRainfall = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=26.9124&longitude=75.7873&current=temperature_2m,relative_humidity_2m,rain,pressure_msl,wind_speed_10m&daily=rain_sum&forecast_days=7&timezone=auto"
        );

        if (!response.ok) {
          throw new Error("Weather API failed");
        }

        const data = await response.json();

        setWeather(data.current);

        const days = data.daily.time.map((date, index) => ({
          day: new Date(date).toLocaleDateString("en-US", {
            weekday: "short",
          }),
          rainfall: data.daily.rain_sum[index],
        }));

        setForecast(days);
      } catch (error) {
        console.error("Rainfall error:", error);
      } finally {
        setLoading(false);
      }
    };

    getRainfall();
  }, []);

  const currentRain = weather?.rain ?? 0;

  const weeklyTotal = forecast.reduce(
    (total, item) => total + item.rainfall,
    0
  );

  const highestRainfall =
    forecast.length > 0
      ? Math.max(...forecast.map((item) => item.rainfall))
      : 0;

  const averageRainfall =
    forecast.length > 0
      ? weeklyTotal / forecast.length
      : 0;

  let rainfallStatus = "Normal";

  if (currentRain > 30) {
    rainfallStatus = "High";
  } else if (currentRain > 10) {
    rainfallStatus = "Moderate";
  }

  return (
    <div>
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Rainfall Monitoring
        </h1>

        <p className="text-slate-500 mt-2">
          Monitor current rainfall and the upcoming 7-day rainfall forecast.
        </p>
      </div>

      {/* Current Rainfall Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-slate-500">
            🌧️ Current Rainfall
          </p>

          <h2 className="text-4xl font-bold text-blue-600 mt-3">
            {loading ? "Loading..." : `${currentRain} mm`}
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Live weather data
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-slate-500">
            📊 7-Day Forecast
          </p>

          <h2 className="text-4xl font-bold text-blue-600 mt-3">
            {loading ? "Loading..." : `${weeklyTotal.toFixed(1)} mm`}
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Expected rainfall
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-slate-500">
            ⚠️ Current Condition
          </p>

          <h2 className="text-3xl font-bold text-orange-500 mt-3">
            {loading ? "Loading..." : rainfallStatus}
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Based on current rainfall
          </p>
        </div>
      </div>

      {/* Rainfall Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <h2 className="text-xl font-semibold text-slate-800">
          🌧️ 7-Day Rainfall Forecast
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Forecast rainfall for Jaipur
        </p>

        <div className="h-80 mt-6">
          {loading ? (
            <div className="h-full flex items-center justify-center text-slate-500">
              Loading rainfall data...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecast}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="rainfall"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Rainfall Analysis */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <h2 className="text-xl font-semibold text-slate-800">
          📈 Rainfall Analysis
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <div className="border rounded-lg p-4">
            <p className="text-sm text-slate-500">
              Highest Forecast Rainfall
            </p>

            <p className="text-2xl font-bold text-blue-600 mt-2">
              {loading
                ? "Loading..."
                : `${highestRainfall.toFixed(1)} mm`}
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Next 7 days
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-sm text-slate-500">
              Average Forecast Rainfall
            </p>

            <p className="text-2xl font-bold text-slate-800 mt-2">
              {loading
                ? "Loading..."
                : `${averageRainfall.toFixed(1)} mm`}
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Daily average
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-sm text-slate-500">
              Monitoring Status
            </p>

            <p className="text-2xl font-bold text-green-600 mt-2">
              Active
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Live data monitoring enabled
            </p>
          </div>
        </div>
      </div>

      {/* Current Weather */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <h2 className="text-xl font-semibold text-slate-800">
          🌦️ Current Weather
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
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
              Pressure
            </p>

            <p className="text-2xl font-bold text-slate-800 mt-2">
              {loading
                ? "Loading..."
                : `${weather?.pressure_msl} hPa`}
            </p>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <h2 className="text-xl font-semibold text-slate-800">
          📍 Monitoring Location
        </h2>

        <div className="mt-4 border rounded-lg p-4">
          <p className="font-semibold text-slate-800">
            Jaipur, Rajasthan
          </p>

          <p className="text-sm text-slate-500 mt-1">
            Live rainfall and forecast conditions are being monitored
            for flood-risk awareness.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Rainfall;