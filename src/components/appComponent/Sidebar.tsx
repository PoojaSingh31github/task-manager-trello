import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed top-0 left-0 overflow-y-auto p-4">
      {/* Workspace Header */}
      <div className="mb-8">
        <h1 className="text-xl font-bold">Trello Workspace</h1>
        <p className="text-sm text-gray-400">Premium</p>
      </div>

      {/* Main Navigation */}
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              className="block w-full py-2 px-4 rounded hover:bg-gray-700"
            >
              Boards
            </Link>
          </li>
          <li>
            <Link
              to="/members"
              className="block w-full py-2 px-4 rounded hover:bg-gray-700"
            >
              Members
            </Link>
          </li>
          <li>
            <Link
              to="/workspace-settings"
              className="block w-full py-2 px-4 rounded hover:bg-gray-700"
            >
              Workspace Settings
            </Link>
          </li>
        </ul>
      </nav>

      {/* Divider */}
      <hr className="my-6 border-gray-700" />

      {/* Workspace Views */}
      <div>
        <p className="text-sm text-gray-400 mb-4">Workspace Views</p>
        <ul className="space-y-4">
          <li>
            <Link
              to="/table"
              className="block w-full py-2 px-4 rounded hover:bg-gray-700"
            >
              Table
            </Link>
          </li>
          <li>
            <Link
              to="/calendar"
              className="block w-full py-2 px-4 rounded hover:bg-gray-700"
            >
              Calendar
            </Link>
          </li>
        </ul>
      </div>

      <div className="mt-12 p-4 bg-gray-800 rounded">
        <p className="text-sm text-gray-300 mb-2">
          keeps your projects organized
        </p>
        <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
