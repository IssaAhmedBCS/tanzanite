

CREATE DATABASE IF NOT EXISTS expense_tracker CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE expense_tracker;

CREATE TABLE IF NOT EXISTS expenses (
  id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  amount      DECIMAL(10, 2)  NOT NULL,
  category    VARCHAR(100)    NOT NULL,
  description VARCHAR(500)    NOT NULL,
  created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_category (category),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
