// client/src/pages/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaPlus, FaChartLine, FaUsers } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="hero-section">
        <h1>Welcome to BookHub 📚</h1>
        <p>Your personal book management system</p>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <FaBook className="stat-icon" />
          <h3>Total Books</h3>
          <p className="stat-number">0</p>
          <Link to="/books" className="stat-link">
            View All Books →
          </Link>
        </div>
        
        <div className="stat-card">
          <FaPlus className="stat-icon" />
          <h3>Add New Book</h3>
          <p>Start building your collection</p>
          <Link to="/books/add" className="stat-link">
            Add Book →
          </Link>
        </div>
        
        <div className="stat-card">
          <FaChartLine className="stat-icon" />
          <h3>Statistics</h3>
          <p>Track your reading progress</p>
          <Link to="/stats" className="stat-link">
            View Stats →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;