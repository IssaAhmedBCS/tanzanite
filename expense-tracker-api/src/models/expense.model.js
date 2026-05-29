const { pool } = require('../config/db');

const ExpenseModel = {
  async create({ amount, category, description }) {
    const [result] = await pool.execute(
      'INSERT INTO expenses (amount, category, description) VALUES (?, ?, ?)',
      [amount, category, description]
    );
    return result.insertId;
  },

  async findAll() {
    const [rows] = await pool.execute(
      'SELECT * FROM expenses ORDER BY created_at DESC'
    );
    return rows;
  },

  async findByCategory(category) {
    const [rows] = await pool.execute(
      'SELECT * FROM expenses WHERE category = ? ORDER BY created_at DESC',
      [category]
    );
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM expenses WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  },

  async deleteById(id) {
    const [result] = await pool.execute(
      'DELETE FROM expenses WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  },
};

module.exports = ExpenseModel;
