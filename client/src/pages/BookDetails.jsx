// client/src/pages/BookDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  FaArrowLeft, 
  FaEdit, 
  FaTrash, 
  FaCalendarAlt, 
  FaTag, 
  FaBook, 
  FaDollarSign, 
  FaBox, 
  FaUser, 
  FaClock,
  FaShareAlt,
  FaPrint
} from 'react-icons/fa';
import { bookService } from '../services/bookService';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const data = await bookService.getBookById(id);
      setBook(data);
    } catch (error) {
      toast.error('Book not found or failed to load');
      navigate('/books');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await bookService.deleteBook(id);
      toast.success('Book deleted successfully');
      navigate('/books');
    } catch (error) {
      toast.error('Failed to delete book');
    }
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/books/${id}`;
    
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `Check out "${book.title}" by ${book.author}`,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied to clipboard!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading book details...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="empty-state">
        <FaBook className="empty-icon" />
        <h3>Book Not Found</h3>
        <p>The book you're looking for doesn't exist.</p>
        <Link to="/books" className="btn btn-primary">
          <FaArrowLeft /> Back to Books
        </Link>
      </div>
    );
  }

  return (
    <div className="book-details-container">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb">
        <Link to="/books" className="breadcrumb-link">
          <FaArrowLeft /> Back to Books
        </Link>
      </div>

      <div className="book-details-card">
        <div className="book-details-header">
          <div className="book-cover-large">
            {book.coverImage ? (
              <img src={book.coverImage} alt={book.title} />
            ) : (
              <div className="cover-placeholder-large">
                <FaBook />
                <span>{book.title.charAt(0)}</span>
              </div>
            )}
          </div>
          
          <div className="book-header-info">
            <div className="book-title-section">
              <h1 className="book-title">{book.title}</h1>
              <h2 className="book-author">by {book.author}</h2>
              
              <div className="book-meta-tags">
                <span className="genre-badge">
                  <FaTag /> {book.genre}
                </span>
                <span className="status-badge">
                  <FaBox /> {book.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div className="book-actions">
              <Link to={`/books/edit/${id}`} className="btn btn-warning">
                <FaEdit /> Edit Book
              </Link>
              <button 
                onClick={() => setShowDeleteModal(true)}
                className="btn btn-danger"
              >
                <FaTrash /> Delete
              </button>
              <button onClick={handleShare} className="btn btn-info">
                <FaShareAlt /> Share
              </button>
              <button onClick={handlePrint} className="btn btn-secondary">
                <FaPrint /> Print
              </button>
            </div>
          </div>
        </div>

        <div className="book-details-content">
          <div className="details-grid">
            {/* Book Information */}
            <div className="details-section">
              <h3>
                <FaBook /> Book Information
              </h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">ISBN:</span>
                  <span className="info-value">{book.isbn || 'Not specified'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Publication Year:</span>
                  <span className="info-value">
                    <FaCalendarAlt /> {book.publicationYear || 'Unknown'}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Price:</span>
                  <span className="info-value price">
                    <FaDollarSign /> {book.price?.toFixed(2) || 'Not specified'}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Stock Available:</span>
                  <span className={`info-value stock ${book.stock > 0 ? 'in-stock' : 'out-stock'}`}>
                    <FaBox /> {book.stock} units
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="details-section">
              <h3>
                <FaBook /> Description
              </h3>
              <div className="description">
                {book.description ? (
                  <p>{book.description}</p>
                ) : (
                  <p className="text-muted">No description provided.</p>
                )}
              </div>
            </div>

            {/* Ownership & Metadata */}
            <div className="details-section">
              <h3>
                <FaUser /> Additional Information
              </h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Added By:</span>
                  <span className="info-value">
                    {book.createdBy?.name || 'Unknown User'}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">
                    {book.createdBy?.email || 'Not available'}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Added Date:</span>
                  <span className="info-value">
                    <FaClock /> {new Date(book.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Last Updated:</span>
                  <span className="info-value">
                    <FaClock /> {new Date(book.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <Link to={`/books/edit/${id}`} className="action-btn edit">
                <FaEdit /> Edit Details
              </Link>
              <button 
                onClick={() => setShowDeleteModal(true)}
                className="action-btn delete"
              >
                <FaTrash /> Delete Book
              </button>
              <Link to="/books/add" className="action-btn add">
                <FaBook /> Add Similar
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Confirm Delete</h3>
              <button 
                className="modal-close"
                onClick={() => setShowDeleteModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete "<strong>{book.title}</strong>"?</p>
              <p className="text-muted">This action cannot be undone.</p>
            </div>
            <div className="modal-actions">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Yes, Delete Book
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;