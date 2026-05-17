import { Review } from '../models/reviewModel.js';
import { Book } from '../models/bookModel.js';

export const createReview = async (bookId, reviewData, user) => {
  const { rating, comment } = reviewData;

  const book = await Book.findById(bookId);

  if (!book) {
    const error = new Error('Book not found');
    error.statusCode = 404;
    throw error;
  }

  const alreadyReviewed = await Review.findOne({
    book: bookId,
    user: user._id,
  });

  if (alreadyReviewed) {
    const error = new Error('Book already reviewed');
    error.statusCode = 400;
    throw error;
  }

  const review = await Review.create({
    name: user.name,
    rating: Number(rating),
    comment,
    user: user._id,
    book: bookId,
  });

  // Update book rating
  const reviews = await Review.find({ book: bookId });
  book.numReviews = reviews.length;
  book.rating =
    reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

  await book.save();

  return review;
};

export const getBookReviews = async (bookId) => {
  return await Review.find({ book: bookId }).sort({ createdAt: -1 });
};
