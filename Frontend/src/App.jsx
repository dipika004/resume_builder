import { Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashboardPage from "./pages/DashboardPage";
import Home from "./pages/Home";
import ResumeBuilderPage from "./pages/ResumeBuilderPage";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Topbar */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl">
            ResumePlatform
          </Link>
          <nav className="flex items-center gap-3">
            {user ? (
              <>
                <Link to="/dashboard" className="px-3 py-1.5 rounded-lg border">
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="px-3 py-1.5 rounded-lg bg-gray-900 text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-1.5 rounded-lg border">
                  Login
                </Link>
                <Link to="/signup" className="px-3 py-1.5 rounded-lg bg-gray-900 text-white">
                  Create account
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Routes */}
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resume-builder"
          element={
            <ProtectedRoute>
              <ResumeBuilderPage />
            </ProtectedRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
