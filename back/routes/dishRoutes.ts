import express from 'express';
import {
  createDish,
  getDishes,
  getDishById,
  updateDish,
  deleteDish,
} from '../controllers/dishController';

const router = express.Router();

router.post('/', createDish);
router.get('/', getDishes);
router.get('/:id', getDishById);
router.put('/:id', updateDish);
router.delete('/:id', deleteDish);

export default router;
