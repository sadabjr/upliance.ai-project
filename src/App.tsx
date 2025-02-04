import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import Navbar from "./components/Navbar"; // Import Navbar
import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

const Redirector = () => {
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!user && location.pathname !== "/login") {
      window.location.replace("/login");
    }
  }, [user, location]);

  return null;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Redirector />
        <Navbar />
        <div className="min-h-screen bg-gray-50">
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-screen">
                Loading...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
