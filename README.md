# Expense Tracker API

A clean, production-quality REST API for tracking personal expenses. Built with **Node.js**, **Express**, **MySQL**, and **Docker**.

---

## Project Structure

```
expense-tracker-api/
├── database/
│   └── init.sql                  # MySQL table creation script
├── src/
│   ├── config/
│   │   └── db.js                 # MySQL connection pool
│   ├── controllers/
│   │   └── expense.controller.js # Request handlers
│   ├── middleware/
│   │   ├── errorHandler.js       # Centralized error handling
│   │   └── validate.js           # Request validation rules
│   ├── models/
│   │   └── expense.model.js      # Parameterized SQL queries
│   ├── routes/
│   │   └── expense.routes.js     # Route definitions
│   └── app.js                    # Express app entry point
├── .env.example                  # Environment variable template
├── .dockerignore
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
```

---

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd expense-tracker-api
```

### 2. Create your environment file

```bash
cp .env.example .env
```

The default `.env` values work out of the box with Docker Compose — no edits needed.

### 3. Start the application

```bash
docker-compose up --build
```

The API will be available at `http://localhost:3000`.

> The first startup may take ~30 seconds while MySQL initializes and the health check passes.

### 4. Stop the application

```bash
docker-compose down
```

To also remove the database volume (wipes all data):

```bash
docker-compose down -v
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check |
| `POST` | `/api/expenses` | Create a new expense |
| `GET` | `/api/expenses` | List all expenses |
| `GET` | `/api/expenses?category=Food` | Filter expenses by category |
| `DELETE` | `/api/expenses/:id` | Delete an expense by ID |

---

## Request & Response Examples

### Health Check

**Request**
```
GET /health
```

**Response**
```json
{
  "success": true,
  "message": "Expense Tracker API is running",
  "environment": "development",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### POST /api/expenses — Create an expense

**Request Body**
```json
{
  "amount": 45.99,
  "category": "Food",
  "description": "Lunch at the office cafeteria"
}
```

**Response — 201 Created**
```json
{
  "success": true,
  "message": "Expense created successfully",
  "data": {
    "id": 1,
    "amount": "45.99",
    "category": "Food",
    "description": "Lunch at the office cafeteria",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

**Response — 400 Validation Error**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "amount", "message": "Amount must be a positive number" }
  ]
}
```

---

### GET /api/expenses — List all expenses

**Request**
```
GET /api/expenses
```

**Response — 200 OK**
```json
{
  "success": true,
  "message": "Expenses retrieved successfully",
  "count": 2,
  "data": [
    {
      "id": 2,
      "amount": "12.50",
      "category": "Transport",
      "description": "Bus ticket",
      "created_at": "2024-01-15T11:00:00.000Z"
    },
    {
      "id": 1,
      "amount": "45.99",
      "category": "Food",
      "description": "Lunch at the office cafeteria",
      "created_at": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### GET /api/expenses?category=Food — Filter by category

**Request**
```
GET /api/expenses?category=Food
```

**Response — 200 OK**
```json
{
  "success": true,
  "message": "Expenses retrieved successfully",
  "count": 1,
  "data": [
    {
      "id": 1,
      "amount": "45.99",
      "category": "Food",
      "description": "Lunch at the office cafeteria",
      "created_at": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### DELETE /api/expenses/:id — Delete an expense

**Request**
```
DELETE /api/expenses/1
```

**Response — 200 OK**
```json
{
  "success": true,
  "message": "Expense with ID 1 deleted successfully"
}
```

**Response — 404 Not Found**
```json
{
  "success": false,
  "message": "Expense with ID 99 not found"
}
```

---

## Testing with Bruno

[Bruno](https://www.usebruno.com/) is a fast, open-source API client. Here is a step-by-step testing workflow:

### Setup

1. Download and install Bruno from [usebruno.com](https://www.usebruno.com/)
2. Open Bruno and create a new collection called **Expense Tracker API**
3. Set the base URL to `http://localhost:3000`

### Step-by-Step Test Flow

**Step 1 — Health check**
- Method: `GET`
- URL: `http://localhost:3000/health`
- Expected: `200 OK` with `"success": true`

**Step 2 — Create a Food expense**
- Method: `POST`
- URL: `http://localhost:3000/api/expenses`
- Body (JSON):
  ```json
  {
    "amount": 45.99,
    "category": "Food",
    "description": "Lunch at the office cafeteria"
  }
  ```
- Expected: `201 Created`

**Step 3 — Create a Transport expense**
- Method: `POST`
- URL: `http://localhost:3000/api/expenses`
- Body (JSON):
  ```json
  {
    "amount": 12.50,
    "category": "Transport",
    "description": "Bus ticket to downtown"
  }
  ```
- Expected: `201 Created`

**Step 4 — List all expenses**
- Method: `GET`
- URL: `http://localhost:3000/api/expenses`
- Expected: `200 OK` with both expenses in `data` array

**Step 5 — Filter by category**
- Method: `GET`
- URL: `http://localhost:3000/api/expenses?category=Food`
- Expected: `200 OK` with only the Food expense

**Step 6 — Test validation (should fail)**
- Method: `POST`
- URL: `http://localhost:3000/api/expenses`
- Body (JSON):
  ```json
  {
    "amount": -5,
    "category": "",
    "description": ""
  }
  ```
- Expected: `400 Bad Request` with validation errors

**Step 7 — Delete an expense**
- Method: `DELETE`
- URL: `http://localhost:3000/api/expenses/1`
- Expected: `200 OK` with success message

**Step 8 — Delete a non-existent expense**
- Method: `DELETE`
- URL: `http://localhost:3000/api/expenses/999`
- Expected: `404 Not Found`

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | API server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |
| `DB_HOST` | MySQL host | `db` |
| `DB_PORT` | MySQL port | `3306` |
| `DB_USER` | MySQL username | `expense_user` |
| `DB_PASSWORD` | MySQL password | `expense_password` |
| `DB_NAME` | MySQL database name | `expense_tracker` |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 20 |
| Framework | Express.js 4 |
| Database | MySQL 8.0 |
| Validation | express-validator |
| Containerization | Docker + Docker Compose |

---

## Security Highlights

- All SQL queries use **parameterized statements** — no SQL injection possible
- Application runs as a **non-root user** inside Docker
- Database is on an **internal Docker network** — not directly exposed to the internet
- Input is **validated and sanitized** before reaching the database
- Stack traces are **hidden in production** (`NODE_ENV=production`)
