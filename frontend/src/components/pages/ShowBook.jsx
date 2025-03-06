import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../BackButton";
import Spinner from "../Spinner";

const ShowBook = () => {
  const [book, setBook] = useState(null); // Start with null to handle loading gracefully
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // To handle API errors
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setBook(res.data); // Save the book data
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load book details. Please try again."); // Set error message
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="p-4">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <BackButton />
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="p-4">
        <BackButton />
        <p className="text-gray-500">No book details available.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-2xl font-bold mb-4">Book Details</h1>
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Id</span>
          <span>{book._id}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Title</span>
          <span>{book.title}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Author</span>
          <span>{book.author}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Publish Year</span>
          <span>{book.publishYear}</span>
        </div>
        {book.createdAt && (
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Created Time</span>
            <span>{new Date(book.createdAt).toLocaleString()}</span>
          </div>
        )}
        {book.updatedAt && (
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Last Updated Time</span>
            <span>{new Date(book.updatedAt).toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowBook;
