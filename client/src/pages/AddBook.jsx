import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bookService } from '../services/bookService';

const AddBook = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await bookService.createBook(data);
      toast.success('Book added successfully!');
      navigate('/books');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to add book');
    } finally {
      setLoading(false);
    }
  };

  const genres = bookService.getGenres();

  return (
    <div className="form-container">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-text">{errors.title.message}</span>}
        </div>

        <div className="form-group">
          <label>Author *</label>
          <input
            type="text"
            {...register('author', { required: 'Author is required' })}
            className={errors.author ? 'error' : ''}
          />
          {errors.author && <span className="error-text">{errors.author.message}</span>}
        </div>

        <div className="form-group">
          <label>Genre</label>
          <select {...register('genre')}>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Publication Year</label>
            <input
              type="number"
              {...register('publicationYear', { 
                min: { value: 1000, message: 'Invalid year' },
                max: { value: new Date().getFullYear(), message: 'Future year not allowed' }
              })}
            />
            {errors.publicationYear && <span className="error-text">{errors.publicationYear.message}</span>}
          </div>

          <div className="form-group">
            <label>Price ($)</label>
            <input
              type="number"
              step="0.01"
              {...register('price', { min: 0 })}
            />
          </div>

          <div className="form-group">
            <label>Stock</label>
            <input
              type="number"
              {...register('stock', { min: 0 })}
            />
          </div>
        </div>

        <div className="form-group">
          <label>ISBN</label>
          <input
            type="text"
            {...register('isbn')}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="4"
            {...register('description')}
          />
        </div>

        <div className="form-group">
          <label>Cover Image URL</label>
          <input
            type="url"
            {...register('coverImage')}
            placeholder="https://example.com/cover.jpg"
          />
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => navigate('/books')}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Adding...' : 'Add Book'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;