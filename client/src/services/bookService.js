import API from './api';

export const bookService = {
  // CREATE
  createBook: async (bookData) => {
    const response = await API.post('/books', bookData);
    return response.data;
  },

  // READ - All books
  getAllBooks: async (params = {}) => {
    const response = await API.get('/books', { params });
    return response.data;
  },

  // READ - Single book
  getBookById: async (id) => {
    const response = await API.get(`/books/${id}`);
    return response.data;
  },

  // UPDATE
  updateBook: async (id, bookData) => {
    const response = await API.put(`/books/${id}`, bookData);
    return response.data;
  },

  // DELETE
  deleteBook: async (id) => {
    const response = await API.delete(`/books/${id}`);
    return response.data;
  },

  // Get genres for dropdown
  getGenres: () => {
    return ['Fiction', 'Non-Fiction', 'Science', 'Biography', 'Technology', 'Other'];
  }
};