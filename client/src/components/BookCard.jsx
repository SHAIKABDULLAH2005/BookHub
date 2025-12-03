import React from 'react';
import { Link } from 'react-router-dom';

export default function BookCard({ book, onDelete }) {
  return (
    <div className="card">
      {book.coverImage ? <img src={book.coverImage} alt={book.title} className="cover" /> : <div className="cover-placeholder">No Image</div>}
      <div className="card-body">
        <h3>{book.title}</h3>
        <p className="author">{book.author}</p>
        <div className="card-actions">
          <Link to={`/books/${book._id}`} className="btn small">View</Link>
          <Link to={`/books/edit/${book._id}`} className="btn small">Edit</Link>
          <button onClick={() => onDelete(book._id)} className="btn small danger">Delete</button>
        </div>
      </div>
    </div>
  );
}
