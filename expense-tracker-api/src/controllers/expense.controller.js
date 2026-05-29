const { validationResult } = require('express-validator');
const ExpenseModel = require('../models/expense.model');

const ExpenseController = {
  async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
        });
      }

      const { amount, category, description } = req.body;
      const insertId = await ExpenseModel.create({ amount, category, description });
      const expense = await ExpenseModel.findById(insertId);

      return res.status(201).json({
        success: true,
        message: 'Expense created successfully',
        data: expense,
      });
    } catch (error) {
      next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      const { category } = req.query;

      const expenses = category
        ? await ExpenseModel.findByCategory(category)
        : await ExpenseModel.findAll();

      return res.status(200).json({
        success: true,
        message: 'Expenses retrieved successfully',
        count: expenses.length,
        data: expenses,
      });
    } catch (error) {
      next(error);
    }
  },

  async remove(req, res, next) {
    try {
      const { id } = req.params;

      const existing = await ExpenseModel.findById(id);
      if (!existing) {
        return res.status(404).json({
          success: false,
          message: `Expense with ID ${id} not found`,
        });
      }

      await ExpenseModel.deleteById(id);

      return res.status(200).json({
        success: true,
        message: `Expense with ID ${id} deleted successfully`,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ExpenseController;
