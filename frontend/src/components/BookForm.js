import React, { useState, useEffect } from 'react';
import { createBook, getBookById, updateBook } from '../services/bookService';
import { useNavigate, useParams, Link } from 'react-router-dom';

function BookForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    publishedYear: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Nếu có id → load dữ liệu để edit
  useEffect(() => {
    if (id) {
      setLoading(true);
      getBookById(id)
        .then(res => {
          setBook(res.data);
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to load book.');
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  const bookData = { ...book };
  delete bookData._id;
  delete bookData.__v;

  try {
    if (id) {
      await updateBook(id, { ...bookData, publishedYear: Number(bookData.publishedYear) });
    } else {
      await createBook({ ...bookData, publishedYear: Number(bookData.publishedYear) });
    }
    navigate('/');
  } catch (err) {
    setError(err.response?.data?.message || 'Failed to save book.');
  }
};


  if (loading) return <p>Loading form...</p>;

  return  (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="mb-3">{id ? ' Edit Book' : ' Add Book'}</h4>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                value={book.title}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Author</label>
              <input
                type="text"
                name="author"
                value={book.author}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={book.description}
                onChange={handleChange}
                className="form-control"
                rows="3"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Published Year</label>
              <input
                type="number"
                name="publishedYear"
                value={book.publishedYear}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="d-flex justify-content-between">
              <Link to="/" className="btn btn-secondary">← Back</Link>
              <button type="submit" className={`btn ${id ? 'btn-warning text-white' : 'btn-success'}`}>
                {id ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


export default BookForm;
