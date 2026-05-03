# Backend

FastAPI service for Don't Sign Anything.

## Run

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The API runs at `http://localhost:8000`.

## Endpoints

- `GET /api/health`
- `POST /api/documents/extract`
- `POST /api/documents/extract-batch`
- `POST /api/documents/extract-pdf` (compatibility alias)
- `POST /api/analyze`
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `PUT /api/auth/preferences`
- `GET /api/history`
- `POST /api/history`
- `GET /api/history/{analysis_id}`
- `PATCH /api/history/{analysis_id}`
- `DELETE /api/history/{analysis_id}`

Saved analysis history is stored in local SQLite under `backend/app_data/`.

## OCR Setup

Image scan uploads use Tesseract OCR when the local engine is installed:

```bash
pip install -r requirements.txt
brew install tesseract
```

Supported image inputs are JPG, PNG, TIFF, BMP, and WebP. Uploaded files are processed in memory.

## Deployment

The backend can be deployed separately from the GitHub Pages frontend. The repo includes a Dockerfile that installs Tesseract for OCR and a root-level `render.yaml` for Render.

Render settings:

- Root directory: `backend`
- Runtime: Docker
- Health check path: `/api/health`
- Environment variable: `ALLOWED_ORIGINS=https://ashishfreaksout.github.io`
- Optional data path: `DSA_DATA_DIR=/app/app_data`

After the API is live, set the frontend GitHub repository variable `VITE_API_URL` to the backend HTTPS URL, then rerun the Pages workflow.
