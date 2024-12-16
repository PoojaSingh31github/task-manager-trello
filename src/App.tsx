import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import DashboardPage from './pages/DashboardPage';
import BoardDetails from './pages/BoardDetails';

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
      </Routes>
      <Routes>
        <Route path="/board-details/:id" element={<BoardDetails />} />
      </Routes>

    </Router>
    </>
  );
};

export default App;