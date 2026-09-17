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
  const rainfallData = [
    { day: "Mon", rainfall: 18 },
    { day: "Tue", rainfall: 32 },
    { day: "Wed", rainfall: 25 },
    { day: "Thu", rainfall: 42 },
    { day: "Fri", rainfall: 35 },
    { day: "Sat", rainfall: 28 },
    { day: "Sun", rainfall: 42 },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Rainfall Monitoring
        </h1>

        <p className="text-slate-500 mt-2">
          Monitor rainfall levels and recent weather conditions.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-slate-500">
            🌧️ Last 24 Hours
          </p>

          <h2 className="text-4xl font-bold text-blue-600 mt-3">
            42 mm
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Recorded rainfall
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-slate-500">
            📊 Last 7 Days
          </p>

          <h2 className="text-4xl font-bold text-blue-600 mt-3">
            222 mm
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Total weekly rainfall
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-slate-500">
            ⚠️ Current Condition
          </p>

          <h2 className="text-3xl font-bold text-orange-500 mt-3">
            Moderate
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Rainfall intensity
          </p>
        </div>

      </div>

      {/* Rainfall Graph */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">

        <h2 className="text-xl font-semibold text-slate-800">
          🌧️ Rainfall Trend
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Rainfall recorded during the last 7 days
        </p>

        <div className="h-80 mt-6">

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={rainfallData}>

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
              Highest Rainfall
            </p>

            <p className="text-2xl font-bold text-blue-600 mt-2">
              42 mm
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Thursday & Sunday
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-sm text-slate-500">
              Average Rainfall
            </p>

            <p className="text-2xl font-bold text-slate-800 mt-2">
              31.7 mm
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Last 7 days
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
              Data monitoring enabled
            </p>
          </div>

        </div>

      </div>

      {/* Location Information */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">

        <h2 className="text-xl font-semibold text-slate-800">
          📍 Monitoring Location
        </h2>

        <div className="mt-4 border rounded-lg p-4">

          <p className="font-semibold text-slate-800">
            Jaipur, Rajasthan
          </p>

          <p className="text-sm text-slate-500 mt-1">
            Rainfall conditions are being monitored for flood-risk awareness.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Rainfall;