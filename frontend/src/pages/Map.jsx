import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function Map() {
  const jaipurPosition = [26.9124, 75.7873];

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

  let monitoringStatus = "Normal";
  let statusColor = "text-green-600";
  let statusBg = "bg-green-100";

  if (currentRain > 10 && currentRain <= 30) {
    monitoringStatus = "Moderate";
    statusColor = "text-orange-600";
    statusBg = "bg-orange-100";
  } else if (currentRain > 30) {
    monitoringStatus = "High Rainfall";
    statusColor = "text-red-600";
    statusBg = "bg-red-100";
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Flood Risk Map
        </h1>

        <p className="text-slate-500 mt-2">
          View rainfall and flood-risk information across different locations.
        </p>
      </div>

      {/* Weather Status */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">
              📍 Monitoring Location
            </p>

            <h2 className="text-xl font-semibold text-slate-800 mt-1">
              Jaipur, Rajasthan
            </h2>
          </div>

          <div className={`${statusBg} px-4 py-3 rounded-lg w-fit`}>
            <p className="text-sm text-slate-500">
              Current Rainfall Status
            </p>

            <p className={`text-lg font-bold ${statusColor}`}>
              {loading ? "Loading..." : monitoringStatus}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="border rounded-lg p-4">
            <p className="text-sm text-slate-500">🌧️ Rainfall</p>

            <p className="text-2xl font-bold text-blue-600 mt-2">
              {loading ? "Loading..." : `${currentRain} mm`}
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Current rainfall
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-sm text-slate-500">🌡️ Temperature</p>

            <p className="text-2xl font-bold text-slate-800 mt-2">
              {loading
                ? "Loading..."
                : `${weather?.temperature_2m}°C`}
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Current temperature
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-sm text-slate-500">💧 Humidity</p>

            <p className="text-2xl font-bold text-blue-600 mt-2">
              {loading
                ? "Loading..."
                : `${weather?.relative_humidity_2m}%`}
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Relative humidity
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-sm text-slate-500">💨 Wind Speed</p>

            <p className="text-2xl font-bold text-slate-800 mt-2">
              {loading
                ? "Loading..."
                : `${weather?.wind_speed_10m} km/h`}
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Current wind
            </p>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="h-[500px] rounded-xl overflow-hidden">
          <MapContainer
            center={jaipurPosition}
            zoom={10}
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={jaipurPosition}>
              <Popup>
                <strong>Jaipur, Rajasthan</strong>
                <br />
                Flood monitoring location
                <br />
                <br />
                Current Rainfall: {currentRain} mm
                <br />
                Status: {monitoringStatus}
              </Popup>
            </Marker>

            {/* Demo visualization zones */}
            <Circle
              center={[26.9124, 75.7873]}
              radius={2500}
              pathOptions={{
                color: "red",
                fillColor: "red",
                fillOpacity: 0.25,
              }}
            />

            <Circle
              center={[26.95, 75.85]}
              radius={4000}
              pathOptions={{
                color: "orange",
                fillColor: "orange",
                fillOpacity: 0.2,
              }}
            />

            <Circle
              center={[26.85, 75.7]}
              radius={5000}
              pathOptions={{
                color: "green",
                fillColor: "green",
                fillOpacity: 0.15,
              }}
            />
          </MapContainer>
        </div>

        <p className="text-xs text-slate-400 mt-3 px-2">
          Note: Colored zones are demo visualization areas and are not
          validated real-time flood-risk predictions.
        </p>
      </div>

      {/* Risk Levels */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Flood Risk Levels
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <p className="font-semibold text-green-600">
                Low Risk
              </p>
            </div>

            <p className="text-sm text-slate-500 mt-2">
              Normal conditions
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-orange-500"></div>
              <p className="font-semibold text-orange-600">
                Moderate Risk
              </p>
            </div>

            <p className="text-sm text-slate-500 mt-2">
              Monitor the situation
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <p className="font-semibold text-red-600">
                High Risk
              </p>
            </div>

            <p className="text-sm text-slate-500 mt-2">
              Immediate attention required
            </p>
          </div>
        </div>
      </div>

      {/* Monitoring Information */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <h2 className="text-xl font-semibold text-slate-800">
          📍 Monitoring Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <div className="border rounded-lg p-4">
            <p className="text-sm text-slate-500">
              Location
            </p>

            <p className="font-semibold text-slate-800 mt-1">
              Jaipur
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-sm text-slate-500">
              Monitoring Status
            </p>

            <p className="font-semibold text-green-600 mt-1">
              ● Active
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-sm text-slate-500">
              Current Rainfall Status
            </p>

            <p className={`font-semibold ${statusColor} mt-1`}>
              {loading ? "Loading..." : monitoringStatus}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Map;