import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import API from '../api';
import BookCard from '../components/BookCard';


export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

const navigate = useNavigate();

useEffect(() => {
  const user = localStorage.getItem("user");
  if (!user) {
    navigate("/login");
  }
}, []);

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
    <div>
      <h2>All Books</h2>
      {loading ? <p>Loading...</p> : (
        books.length === 0 ? <p>No books yet — add one!</p> : (
          <div className="grid">
            {books.map(book => (
              <BookCard key={book._id} book={book} onDelete={handleDelete} />
            ))}
          </div>
        )
      )}
    </div>
  );
}
