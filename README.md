# HackaTUM 2025

## Prerequisites
1. **Docker Desktop** (or Engine) running.
2. **Node.js v20+** (Check with `node -v`).
3. **Python 3.10+**.

## ⚡ Quick Start

### 1. Infrastructure (Database)
```bash
cd docker
docker compose up
# Wait for "database system is ready to accept connections"
```

### 2. Backend (The Brain)
Open a new terminal:
```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
python main.py
```
*Swagger Docs:* [http://localhost:8000/docs](http://localhost:8000/docs)

### 3. Frontend (The Face)
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
*UI:* [http://localhost:3000](http://localhost:3000)

## Secrets (.env)
Ask Sriyash for the `.env` file content! Do not commit secrets to Git.
