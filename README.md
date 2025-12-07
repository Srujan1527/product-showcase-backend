# Product Showcase & Enquiry – Backend (Node.js + Express + PostgreSQL)

This is the **backend API** for the _Product Showcase & Enquiry_ app.

It provides:

- Product listing with **search + pagination**
- Product details endpoint
- Enquiry submission and **persistence in PostgreSQL**
- JWT-based authentication (signup/login)
- Admin-only endpoint to view all enquiries

Frontend (React) consumes this API via `/api/...` routes.

---

## 1. Tech Stack

- **Runtime:** Node.js (TypeScript)
- **Framework:** Express
- **Database:** PostgreSQL
- **ORM/DB Client:** `pg`
- **Auth:** JSON Web Tokens (JWT) + bcrypt password hashing
- **Security Middleware:** `helmet`, `cors`
- **Dev:** `ts-node-dev` for hot reload

---

## 2. Project Structure

```txt
backend/
  src/
    index.ts               # App entry point
    db/
      config.ts            # PostgreSQL pool / query helper
    products/
      routes.ts
      controllers.ts
      service.ts
    enquiries/
      routes.ts
      controllers.ts
      service.ts
    auth/
      routes.ts
      controller.ts
      service.ts
      middleware.ts        # auth + admin guards
    sql/
      schema.sql           # DB schema (tables + indexes)
      products_seed.sql    # Seed sample products
      seed_users.sql       # (Optional) Seed users
      seed_enquiries.sql   # (Optional) Seed enquiries
  package.json
  tsconfig.json
  .env.example             # Example environment variables
```
## Install Dependencies

```txt
cd backend
npm install
```

## Environment Variables
Create a .env file in the backend folder (same level as package.json):
``` txt 
# Server
PORT=4000

# PostgreSQL connection
PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=your_postgres_password
PGDATABASE=product-showcase

# JWT configuration
JWT_SECRET_KEY=supersecret_jwt_key_change_this
JWT_EXPIRES_IN=1d
``` 
## CREATE the DATABASE 
``` txt 
CREATE DATABASE "product-showcase";
```
## Create Tables (Schema)

In the terminal:
``` txt 
\i 'backend/src/sql/schema.sql'
```
## schema.sql 

``` txt 
-- Drops existing tables (for dev reset)
DROP TABLE IF EXISTS enquiries;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

-- Products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT,
    short_desc TEXT,
    long_desc TEXT,
    price NUMERIC(10, 2),
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enquiries table
CREATE TABLE enquiries (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Optional indexes
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_enquiries_product_id ON enquiries(product_id);

``` 

## seed sample data 
```txt
\i 'backend/src/sql/products_seed.sql'

created dummy data using chatgpt and insert using psql.exe 
and  there are more ... 
```
## run the server 
``` txt
npm run dev
```
