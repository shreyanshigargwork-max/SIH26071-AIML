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

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Flood Risk Map
        </h1>

        <p className="text-slate-500 mt-2">
          View rainfall and flood-risk information across different locations.
        </p>
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

            {/* Jaipur Monitoring Location */}
            <Marker position={jaipurPosition}>
              <Popup>
                <div>
                  <strong>Jaipur, Rajasthan</strong>
                  <br />
                  Flood monitoring location
                </div>
              </Popup>
            </Marker>

            {/* High Risk Zone */}
            <Circle
              center={[26.9124, 75.7873]}
              radius={2500}
              pathOptions={{
                color: "red",
                fillColor: "red",
                fillOpacity: 0.25,
              }}
            />

            {/* Moderate Risk Zone */}
            <Circle
              center={[26.9500, 75.8500]}
              radius={4000}
              pathOptions={{
                color: "orange",
                fillColor: "orange",
                fillOpacity: 0.20,
              }}
            />

            {/* Low Risk Zone */}
            <Circle
              center={[26.8500, 75.7000]}
              radius={5000}
              pathOptions={{
                color: "green",
                fillColor: "green",
                fillOpacity: 0.15,
              }}
            />

          </MapContainer>

        </div>
      </div>

      {/* Risk Legend */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">

        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Flood Risk Levels
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* Low Risk */}
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

          {/* Moderate Risk */}
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

          {/* High Risk */}
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

      {/* Map Information */}
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
              Risk Monitoring
            </p>

            <p className="font-semibold text-orange-600 mt-1">
              Active
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Map;