import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Map from "./pages/Map";
import Rainfall from "./pages/Rainfall";
import Alerts from "./pages/Alerts";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100">

        {/* Navbar */}
        <nav className="bg-slate-900 text-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              {/* Logo */}
              <Link
                to="/"
                className="text-xl font-bold hover:text-blue-300 transition"
              >
                🌧️ SIH26071
              </Link>

              {/* Navigation */}
              <div className="flex flex-wrap gap-2 sm:gap-6 text-sm">

                <Link
                  to="/"
                  className="px-3 py-2 rounded-lg hover:bg-slate-700 hover:text-blue-300 transition"
                >
                  Dashboard
                </Link>

                <Link
                  to="/map"
                  className="px-3 py-2 rounded-lg hover:bg-slate-700 hover:text-blue-300 transition"
                >
                  🗺️ Map
                </Link>

                <Link
                  to="/rainfall"
                  className="px-3 py-2 rounded-lg hover:bg-slate-700 hover:text-blue-300 transition"
                >
                  🌧️ Rainfall
                </Link>

                <Link
                  to="/alerts"
                  className="px-3 py-2 rounded-lg hover:bg-slate-700 hover:text-blue-300 transition"
                >
                  🚨 Alerts
                </Link>

              </div>

            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/map"
              element={<Map />}
            />

            <Route
              path="/rainfall"
              element={<Rainfall />}
            />

            <Route
              path="/alerts"
              element={<Alerts />}
            />

          </Routes>

        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 text-center py-5 mt-10">
          <p className="text-sm">
            SIH26071 • Flood & Rainfall Monitoring System
          </p>

          <p className="text-xs mt-1">
            Smart monitoring dashboard for flood-risk awareness
          </p>
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;