const { Router } = require('express');
const ExpenseController = require('../controllers/expense.controller');
const { validateExpense } = require('../middleware/validate');

const router = Router();

router.post('/', validateExpense, ExpenseController.create);
router.get('/', ExpenseController.getAll);
router.delete('/:id', ExpenseController.remove);

module.exports = router;
