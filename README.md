# Don't Sign Anything!

Don't Sign Anything is a phased product for helping people understand potential document risks before signing agreements. The current build includes the Phase 1 web app MVP, Phase 2 analysis upgrades, Phase 3 account/history workflow, Phase 4 scanning workflow, and the first Phase 5 mobile app scaffold.

This project is an educational document risk assistant. It is not a lawyer and does not provide legal advice.

## Phase 1 Scope

- React + Vite frontend
- FastAPI backend
- Text extraction for PDF, DOCX, ODT, RTF, TXT, and Markdown files
- Pasted agreement text support
- Rule-based clause detection
- Risk score from 0 to 100
- Low, Medium, and High risk levels
- Plain-English explanations and questions before signing
- Privacy notice and no document history in the MVP

Not included in Phase 1: user accounts, saved document history, OCR for scans, mobile apps, browser extension, advanced AI chat, attorney referrals, or paid LLM dependency.

## Phase 2 Started

- Rule-based document type classification
- Classification confidence and matched type signals
- Risk confidence scores
- Document-type-aware scoring adjustments
- More clause patterns for privacy, waivers, contractor agreements, online terms, and employment restrictions
- Highlighted trigger language in the detailed findings view
- Full report generation with HTML, plain text, and print/save-PDF options
- Rule-based fallback remains the default behavior

Optional LLM summaries are still deferred until an API key and provider choice are intentionally configured.

## Phase 3 Started

- Optional local signup/login
- SQLite-backed saved analysis history
- Save the current report after analysis
- Open previous saved analyses
- Rename saved documents
- Permanently delete saved analyses
- User preferences for privacy, hidden fees, employment restrictions, and cancellation/refunds
- Preference-aware scoring adjustments

Phase 3 stores saved analysis reports in `backend/app_data/`. The original uploaded document file is not saved by this workflow.

## Phase 4 Started

- Image upload support for JPG, PNG, TIFF, BMP, and WebP scans
- Multi-file upload for multi-page scanned documents
- OCR service module designed for Tesseract
- Extracted scan text appears in the same editable text preview before analysis
- Mobile app roadmap badges are shown without fake store links

OCR requires local setup:

```bash
cd backend
source .venv/bin/activate
pip install -r requirements.txt
brew install tesseract
```

If OCR dependencies or the Tesseract engine are missing, image uploads return a setup message instead of silently failing.

## Phase 5 Started

- Expo React Native mobile app in `mobile/`
- Camera scan, photo selection, and document picker workflow
- Reuses the backend OCR/extraction and risk analysis APIs
- Mobile report screen with risk score, summary, top risks, and questions
- Email sign-in using the existing local auth endpoints
- Save, open, delete, and share reports on mobile
- Android internal preview build through Expo/EAS:
  `https://expo.dev/accounts/ashishfreaksout/projects/dont-sign-anything/builds/8d98490d-2b8b-442b-b3e3-7461059c5c8b`

Real App Store and Google Play links should be added only after the apps are published.

## Project Structure

```text
dont-sign-anything/
  frontend/
    src/
      components/
      pages/
      services/
      utils/
  backend/
    app/
      main.py
      routes/
      services/
      models/
      utils/
    requirements.txt
  mobile/
    App.js
    src/
      services/
  docs/
    roadmap.md
    risk_categories.md
    disclaimers.md
```

## Documentation

- [Product brief](docs/product_brief.md)
- [Case study](docs/case_study.md)
- [Architecture overview](docs/architecture.md)
- [Testing and launch checklist](docs/testing_launch_checklist.md)
- [Deployment](docs/deployment.md)
- [Roadmap](docs/roadmap.md)
- [Risk categories](docs/risk_categories.md)
- [Disclaimers](docs/disclaimers.md)
- [Privacy policy](docs/privacy_policy.md)
- [Terms of use](docs/terms_of_use.md)

## Run Locally

## Public Web Preview

The frontend is configured for GitHub Pages at:

```text
https://ashishfreaksout.github.io/dont-sign-anything/
```

GitHub Pages hosts the static frontend only. The FastAPI backend must be deployed separately before public users can run document upload, OCR, accounts, saved history, and live analysis from the public site.

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The backend runs at `http://localhost:8000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` and proxies `/api` requests to the backend.

### Mobile

```bash
cd mobile
npm start
```

Use the in-app Backend URL field to point at your FastAPI server. A real phone needs your computer LAN IP, for example `http://192.168.1.25:8000`.

For Android tester access without publishing to Google Play, share the Expo/EAS internal preview build link. Android users may need to allow APK installs from their browser. iOS testing still requires Apple Developer/TestFlight setup or registered device distribution.

## API

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

## Privacy Notes

Accounts are optional. Uploaded files and scan images are read in memory for extraction and are not intentionally stored by the application. If a signed-in user saves an analysis, the analysis report is stored locally in SQLite under `backend/app_data/` until the user deletes it. Users should still treat agreements as sensitive documents and avoid uploading content they do not want processed locally by this development app.

## Disclaimer

This is not legal advice. The app provides educational risk signals, plain-English explanations, and questions to ask before signing. Consult a licensed attorney for legal decisions.
