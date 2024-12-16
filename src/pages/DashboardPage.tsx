import React from "react";
import Sidebar from "../components/appComponent/Sidebar";
import Dashboard from "../components/appComponent/Dashboard";

const DashboardPage: React.FC = () => {
  return (
    <div className="flex">
      <div className="w-[250px] bg-gray-800 h-screen fixed top-0 left-0 ">
        <Sidebar />
      </div>

      <div className="ml-[250px] w-full">
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
