import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../api';

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get(`/books/${id}`);
        setBook(res.data);
      } catch (err) {
        console.error(err);
        alert('Could not load book');
      }
    })();
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <button className="btn" onClick={() => navigate(-1)}>Back</button>
      <div className="details">
        {book.coverImage ? <img src={book.coverImage} className="details-cover" alt={book.title} /> : <div className="details-cover-placeholder">No Image</div>}
        <div className="details-body">
          <h2>{book.title}</h2>
          <p className="author">{book.author}</p>
          <p><strong>Published:</strong> {book.publishedDate ? new Date(book.publishedDate).toDateString() : '—'}</p>
          <p>{book.description}</p>
          <div style={{ marginTop: 12 }}>
            <Link to={`/books/edit/${book._id}`} className="btn">Edit</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
