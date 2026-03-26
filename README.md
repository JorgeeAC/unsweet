# unsweet

UNsweet is a full-stack project with:
- `backend/`: FastAPI API
- `frontend/`: React + Vite web app

## Quick Start

### 0) Make Targets
From repo root:
```bash
make backend        # run FastAPI dev server
make frontend       # run Vite dev server
make test           # run backend + frontend tests
make test-backend   # run backend tests only
make test-frontend  # run frontend tests only
```

### 1) Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload
```

Backend runs at `http://127.0.0.1:8000`.

### 2) Frontend
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

## Testing

- Backend tests live in `backend/tests/` and run with Python `unittest`.
- Frontend tests live in `frontend/tests/` and run with Node's built-in test runner.
- Current baseline: 5 backend tests + 5 frontend tests.

## Project Structure

```text
unsweet/
├── backend/
│   ├── api/
│   │   ├── cms.py
│   │   └── shop.py
│   ├── models/
│   │   └── __init__.py
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── app.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```
