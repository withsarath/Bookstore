import express from 'express';
import * as bookController from '../controllers/bookController.js';
import * as reviewController from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Upload route
router.post('/upload', protect, upload.single('cover'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// Protected routes (higher priority)
router.get('/mine', protect, bookController.getMyBooks);
router.get('/stats', protect, bookController.getStats);

// Public routes
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBook);
router.get('/:id/reviews', reviewController.getReviews);

// Protected routes (remaining)
router.post('/', protect, bookController.createBook);
router.put('/:id', protect, bookController.updateBook);
router.delete('/:id', protect, bookController.deleteBook);
router.post('/:id/reviews', protect, reviewController.createReview);

export default router;
