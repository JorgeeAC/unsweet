.PHONY: backend frontend test test-backend test-frontend

backend:
	cd backend && python3 -m uvicorn main:app --reload

frontend:
	cd frontend && npm run dev

test: test-backend test-frontend

test-backend:
	cd backend && python3 -m unittest discover -s tests -p 'test_*.py' -v

test-frontend:
	cd frontend && node --test tests/*.test.mjs
