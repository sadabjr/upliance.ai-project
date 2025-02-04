import { useAuth } from "../contexts/AuthContext";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { user, logout } = useAuth();

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "User Activity",
        data: [3, 5, 2, 8, 6], 
        borderColor: "rgb(75, 192, 192)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="bg-white shadow-sm rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src={"https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Welcome, {user.displayName}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        
        </div>
      </header>

      <section className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">User Activity Trends</h3>
        <div className="w-full h-96">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "top",
                },
                tooltip: {
                  enabled: true,
                },
              },
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;