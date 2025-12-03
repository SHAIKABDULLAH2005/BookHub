import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import API from '../api';
import BookCard from '../components/BookCard';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged out successfully");
    navigate("/login");
  };

  // PROTECT ROUTE - IF NO USER, GO TO LOGIN
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  // FETCH BOOKS
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await API.get('/books');
      setBooks(res.data);
    } catch (err) {
      console.error(err);
      alert('Could not fetch books');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // DELETE BOOK
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this book?')) return;
    try {
      await API.delete(`/books/${id}`);
      setBooks(prev => prev.filter(b => b._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      {/* ✅ HEADER + LOGOUT BUTTON */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px"
      }}>
        <h1 style={{ color: "#333" }}>📚 BookHub</h1>

        <button
          onClick={handleLogout}
          style={{
            padding: "8px 15px",
            background: "crimson",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

      {/* ✅ BOOKS LIST */}
      <h2 style={{ marginBottom: "20px" }}>All Books</h2>

      {loading ? (
        <p>Loading...</p>
      ) : books.length === 0 ? (
        <p>No books yet — add one!</p>
      ) : (
        <div className="grid">
          {books.map(book => (
            <BookCard
              key={book._id}
              book={book}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

    </div>
  );
}
