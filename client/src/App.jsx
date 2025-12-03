import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookForm from './pages/BookForm';
import BookDetails from './pages/BookDetails';
import Header from './components/Header';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <div>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/" element={<Home />} />
          <Route path="/books/new" element={<BookForm />} />
          <Route path="/books/edit/:id" element={<BookForm editMode />} />
          <Route path="/books/:id" element={<BookDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
