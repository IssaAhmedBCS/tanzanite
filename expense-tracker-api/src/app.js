require('dotenv').config();
const express = require('express');
const { testConnection } = require('./config/db');
const expenseRoutes = require('./routes/expense.routes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Expense Tracker API is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api/expenses', expenseRoutes);

// 404 handler
app.use(notFound);

// Centralized error handler
app.use(errorHandler);

async function bootstrap() {
  await testConnection();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📋 Environment: ${process.env.NODE_ENV}`);
  });
}

bootstrap();
