import * as reviewService from '../services/reviewService.js';

export const createReview = async (req, res) => {
  try {
    const review = await reviewService.createReview(req.params.id, req.body, req.user);
    res.status(201).json(review);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getBookReviews(req.params.id);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
