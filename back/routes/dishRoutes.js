const express = require('express');
const {
  createDish,
  getDishes,
  getDishById,
  updateDish,
  deleteDish,
} = require('../controllers/dishController');

const router = express.Router();

router.post('/', createDish);
router.get('/', getDishes);
router.get('/:id', getDishById);
router.put('/:id', updateDish);
router.delete('/:id', deleteDish);

module.exports = router;
