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

If GitHub Pages is not already enabled for the repository:

1. Open the GitHub repository.
2. Go to `Settings`.
3. Open `Pages`.
4. Under `Build and deployment`, set `Source` to `GitHub Actions`.
5. Re-run the `Deploy frontend to GitHub Pages` workflow if GitHub does not run it automatically.

GitHub says a repository can publish Pages from a branch or through a GitHub Actions workflow. This project uses the GitHub Actions option because the frontend needs a Vite build step.

## Backend Limitation

GitHub Pages only hosts static files. It does not run the FastAPI backend.

That means the public GitHub Pages site can load the frontend, but document upload, OCR, accounts, saved history, and live analysis need the backend deployed separately.

When the backend has a public HTTPS URL, add a repository variable named `VITE_API_URL` with the backend base URL, for example:

```text
https://dont-sign-anything-api.example.com
```

Then re-run the Pages workflow. The frontend will call:

```text
VITE_API_URL/api/analyze
VITE_API_URL/api/documents/extract
```

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
