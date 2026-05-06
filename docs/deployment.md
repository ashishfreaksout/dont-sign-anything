# Deployment

## GitHub Pages Frontend

The React frontend is configured to deploy to GitHub Pages with GitHub Actions.

Expected public URL:

```text
https://ashishfreaksout.github.io/dont-sign-anything/
```

The workflow lives at:

```text
.github/workflows/deploy-pages.yml
```

It builds the app from `frontend/`, uses the repository path `/dont-sign-anything/` as the Vite base path, uploads `frontend/dist`, and deploys the static files to GitHub Pages.

## Enable Pages

The workflow asks GitHub to enable Pages automatically. If GitHub does not allow that for this repository, enable it manually:

1. Open the GitHub repository.
2. Go to `Settings`.
3. Open `Pages`.
4. Under `Build and deployment`, set `Source` to `GitHub Actions`.
5. Re-run the `Deploy frontend to GitHub Pages` workflow if GitHub does not run it automatically.

GitHub says a repository can publish Pages from a branch or through a GitHub Actions workflow. This project uses the GitHub Actions option because the frontend needs a Vite build step.

## Backend Limitation

GitHub Pages only hosts static files. It does not run the FastAPI backend.

That means the public GitHub Pages site can load the frontend, but document upload, OCR, accounts, saved history, and live analysis need the backend deployed separately.

## FastAPI Backend On Render

The backend can be deployed as a separate Render web service. Render's FastAPI guide uses a Python build command and a Uvicorn start command, and Render web services must bind to `0.0.0.0` on the assigned `$PORT`. This repo uses a Docker deployment instead so the image can include the Tesseract OCR engine.

This repo includes:

```text
render.yaml
backend/Dockerfile
backend/.dockerignore
```

Render Blueprint settings:

- Service name: `dont-sign-anything-api`
- Runtime: Docker
- Root directory: `backend`
- Health check path: `/api/health`
- Allowed frontend origin: `https://ashishfreaksout.github.io`

Deploy steps:

1. Open Render.
2. Create a new Blueprint or Web Service from the GitHub repo.
3. Use the root `render.yaml` if deploying as a Blueprint.
4. Wait for the service to build and deploy.
5. Open the service URL and confirm `/api/health` returns `{"status":"ok"}`.

When the backend has a public HTTPS URL, add a repository variable named `VITE_API_URL` with the backend base URL, for example:

```text
https://dont-sign-anything-api.example.com
```

Then re-run the Pages workflow. The frontend will call:

```text
VITE_API_URL/api/analyze
VITE_API_URL/api/documents/extract
```

The Pages workflow intentionally runs on every push to `main`, not only frontend file changes. This lets a simple empty commit or documentation update rebuild the frontend after repository variables such as `VITE_API_URL` change.

## Crypto Tip Wallets

The support page can show crypto wallet addresses when repository variables are configured:

```text
VITE_BTC_ADDRESS=your-bitcoin-address
VITE_ETH_ADDRESS=your-ethereum-address
```

If these variables are missing, the support page stays visible but tells maintainers which variable to add. Crypto tips are voluntary and do not unlock paid features. After changing these variables, re-run the GitHub Pages workflow so Vite can bake the values into the static frontend.

## Local Build Check

Before pushing deployment changes:

```bash
cd frontend
VITE_BASE_PATH=/dont-sign-anything/ npm run build
```

## Future Backend Hosting Options

Reasonable backend hosts for the FastAPI service include:

- Render
- Railway
- Fly.io
- Google Cloud Run
- AWS App Runner
- A small VPS

Use HTTPS for the backend URL because GitHub Pages is served over HTTPS.

## Storage Note

The current backend stores optional saved reports in SQLite. On a simple hosted web service without a persistent disk, that data can reset when the service restarts or redeploys. For production, move saved history to PostgreSQL or another persistent database.
