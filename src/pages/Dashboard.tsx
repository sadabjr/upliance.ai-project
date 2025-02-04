import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import Counter from "../components/Counter";
import RichTextEditor from "../components/TextEditor";
import UserForm from "../components/UserForm";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const chartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "User Activity (Counter)",
        data: [count, count + 2, count + 4, count + 5],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 p-8 space-y-6">
     
      <header className="flex justify-between items-center bg-white rounded-2xl shadow-md p-6 mb-6">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 font-medium">Welcome</span>
          <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
            {userData.name ? userData.name[0].toUpperCase() : 'U'}
          </div>
        </div>
      </header>

    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-white rounded-3xl shadow-xl p-6 transform transition-all hover:scale-[1.02] hover:shadow-2xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Activity Counter
          </h2>
          <div className="flex justify-center items-center">
            <Counter count={count} setCount={setCount} />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 transform transition-all hover:scale-[1.02] hover:shadow-2xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Text Editor
          </h2>
          <RichTextEditor userData={userData} />
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 transform transition-all hover:scale-[1.02] hover:shadow-2xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            User Profile
          </h2>
          <UserForm userData={userData} setUserData={setUserData} />
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 transform transition-all hover:scale-[1.02] hover:shadow-2xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Activity Trends
          </h2>
          <div className="h-64 flex items-center justify-center">
            <Bar 
              data={chartData} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false 
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;