import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-800 text-white py-3 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white hover:text-indigo-300">
          My App
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-lg font-medium hover:text-indigo-300 transition duration-300"
          >
            Home
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className="text-lg font-medium hover:text-indigo-300 transition duration-300"
            >
              Dashboard
            </Link>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-lg font-medium hover:text-indigo-300 transition duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
