function Alerts() {
  return (
    <div>
      {/* Header */}
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
            1
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-sm text-slate-500">
            ⚠️ Moderate Alerts
          </p>

          <p className="text-3xl font-bold text-orange-500 mt-2">
            1
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

      {/* Alerts */}
      <div className="space-y-5">

        {/* High Alert */}
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
            Heavy rainfall has been detected in the monitored area.
            Continue monitoring rainfall conditions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 text-sm text-slate-400">
            <span>📍 Jaipur, Rajasthan</span>
            <span>🕒 Recent</span>
          </div>

        </div>

        {/* Moderate Alert */}
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-500">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

            <h2 className="text-xl font-semibold text-slate-800">
              ⚠️ Moderate Flood Risk
            </h2>

            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium w-fit">
              Moderate
            </span>

          </div>

          <p className="text-slate-500 mt-3">
            Current rainfall levels indicate moderate flood-risk
            conditions in the monitored region.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 text-sm text-slate-400">
            <span>📍 Jaipur, Rajasthan</span>
            <span>🕒 Recent</span>
          </div>

        </div>

        {/* Information */}
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
          Rainfall and weather information is being monitored
          for flood-risk awareness.
        </p>

      </div>

    </div>
  );
}

export default Alerts;