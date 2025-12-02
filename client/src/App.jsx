// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BookList from './pages/BookList';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import BookDetails from './pages/BookDetails';
import PrivateRoute from './components/PrivateRoute';
import './styles/Auth.css';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/books" element={<PrivateRoute><BookList /></PrivateRoute>} />
            <Route path="/books/add" element={<PrivateRoute><AddBook /></PrivateRoute>} />
            <Route path="/books/edit/:id" element={<PrivateRoute><EditBook /></PrivateRoute>} />
            <Route path="/books/:id" element={<PrivateRoute><BookDetails /></PrivateRoute>} />
          </Routes>
        </div>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;