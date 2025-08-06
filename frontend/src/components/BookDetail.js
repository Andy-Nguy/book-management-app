import React, { useEffect, useState } from 'react';
import { getBookById } from '../services/bookService';
import { useParams, Link } from 'react-router-dom';

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const res = await getBookById(id);
        setBook(res.data);
      } catch (err) {
        setError('Book not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!book) return <p>No data</p>;

  return (
     <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="card-title mb-3">📖 Book Detail</h4>
          <p><strong>Title:</strong> {book.title}</p>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Description:</strong> {book.description}</p>
          <p><strong>Year:</strong> {book.publishedYear}</p>
          <Link to="/" className="btn btn-secondary mt-2">
            ← Back to List
          </Link>
        </div>
      </div>
    </div>
  );
}


export default BookDetail;
