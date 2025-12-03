# BookHub — MERN Example

Simple BookHub app (MERN stack) with CRUD for books.

## Structure
- `server/` — Express backend, MongoDB with Mongoose
- `client/` — React frontend

## Requirements
- Node.js (v16+ recommended)
- MongoDB (local or Atlas)

## Setup

### 1. Backend
```bash
cd server
cp .env.example .env
# edit .env to set MONGO_URI if necessary
npm install
npm run dev   # starts with nodemon
# or npm start
