# unsweet

UNsweet is a full-stack project with:
- `backend/`: FastAPI API
- `frontend/`: React + Vite web app

## Quick Start

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

