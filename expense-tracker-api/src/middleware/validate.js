const { body } = require('express-validator');

const validateExpense = [
  body('amount')
    .notEmpty().withMessage('Amount is required')
    .isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),

  body('category')
    .notEmpty().withMessage('Category is required')
    .isString().withMessage('Category must be a string')
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage('Category must be between 1 and 100 characters'),

  body('description')
    .notEmpty().withMessage('Description is required')
    .isString().withMessage('Description must be a string')
    .trim()
    .isLength({ min: 1, max: 500 }).withMessage('Description must be between 1 and 500 characters'),
];

module.exports = { validateExpense };
