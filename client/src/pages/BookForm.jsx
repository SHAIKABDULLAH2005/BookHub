import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api';

export default function BookForm({ editMode }) {
  const [form, setForm] = useState({
    title: '',
    author: '',
    description: '',
    publishedDate: '',
    coverImage: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (editMode && id) {
      (async () => {
        try {
          const res = await API.get(`/books/${id}`);
          const data = res.data;
          setForm({
            title: data.title || '',
            author: data.author || '',
            description: data.description || '',
            publishedDate: data.publishedDate ? data.publishedDate.split('T')[0] : '',
            coverImage: data.coverImage || ''
          });
        } catch (err) {
          console.error(err);
          alert('Could not load book');
        }
      })();
    }
  }, [editMode, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) return alert('Title is required');
    try {
      setLoading(true);
      const payload = { ...form };
      if (!payload.publishedDate) delete payload.publishedDate;
      if (editMode && id) {
        await API.put(`/books/${id}`, payload);
        navigate('/');
      } else {
        await API.post('/books', payload);
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      alert('Submit failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{editMode ? 'Edit Book' : 'Add Book'}</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Title *</label>
        <input name="title" value={form.title} onChange={handleChange} required />

        <label>Author</label>
        <input name="author" value={form.author} onChange={handleChange} />

        <label>Published Date</label>
        <input type="date" name="publishedDate" value={form.publishedDate} onChange={handleChange} />

        <label>Cover Image URL</label>
        <input name="coverImage" value={form.coverImage} onChange={handleChange} />

        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} rows="6" />

        <div style={{ marginTop: 12 }}>
          <button type="submit" className="btn">{loading ? 'Saving...' : 'Save'}</button>
          <button type="button" className="btn" onClick={() => navigate(-1)} style={{ marginLeft: 8 }}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
