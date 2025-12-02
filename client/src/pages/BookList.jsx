import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bookService } from '../services/bookService';
import { FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const params = { search, genre, page: currentPage, limit: 8 };
      const data = await bookService.getAllBooks(params);
      setBooks(data.books);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [currentPage, genre]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await bookService.deleteBook(id);
        toast.success('Book deleted successfully');
        fetchBooks();
      } catch (error) {
        toast.error('Failed to delete book');
      }
    }
  };

  const genres = bookService.getGenres();

  return (
    <div className="book-list">
      <div className="header">
        <h2>Book Collection</h2>
        <Link to="/books/add" className="btn btn-primary">
          <FaPlus /> Add New Book
        </Link>
      </div>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && fetchBooks()}
        />
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">All Genres</option>
          {genres.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <button onClick={fetchBooks}>Search</button>
      </div>

      {/* Book Grid */}
      {loading ? (
        <div className="loading">Loading books...</div>
      ) : books.length === 0 ? (
        <div className="empty">No books found</div>
      ) : (
        <>
          <div className="book-grid">
            {books.map(book => (
              <div key={book._id} className="book-card">
                <div className="book-cover">
                  {book.coverImage ? (
                    <img src={book.coverImage} alt={book.title} />
                  ) : (
                    <div className="cover-placeholder">
                      {book.title.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p className="author">By {book.author}</p>
                  <p className="genre">{book.genre}</p>
                  <p className="price">${book.price?.toFixed(2)}</p>
                  <p className="stock">Stock: {book.stock}</p>
                  
                  <div className="actions">
                    <Link to={`/books/${book._id}`} className="btn btn-info">
                      <FaEye /> View
                    </Link>
                    <Link to={`/books/edit/${book._id}`} className="btn btn-warning">
                      <FaEdit /> Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(book._id)}
                      className="btn btn-danger"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BookList;