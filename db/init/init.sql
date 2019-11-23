-- TODO: Extract DB name from .env
CREATE DATABASE forex_models

-- Collation corrections based on other Api-handling DB experience with MariaDB
  CHARACTER SET = 'utf8mb4'
  COLLATE = 'utf8mb4_unicode_ci';

