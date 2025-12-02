import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bookService } from '../services/bookService';

const EditBook = () => {
  const { id } = useParams();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await bookService.getBookById(id);
        setBook(data);
        reset(data);
      } catch (error) {
        toast.error('Book not found');
        navigate('/books');
      }
    };
    fetchBook();
  }, [id, reset, navigate]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await bookService.updateBook(id, data);
      toast.success('Book updated successfully!');
      navigate(`/books/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update book');
    } finally {
      setLoading(false);
    }
  };

  if (!book) return <div>Loading...</div>;

  const genres = bookService.getGenres();

  return (
    <div className="form-container">
      <h2>Edit Book: {book.title}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Form fields similar to AddBook.jsx */}
        {/* ... */}
        
        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => navigate(`/books/${id}`)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Updating...' : 'Update Book'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBook;