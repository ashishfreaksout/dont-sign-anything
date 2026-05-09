# Testing And Launch Checklist

Use this checklist before sharing the project with other people.

## Backend Checks

- `GET /api/health` returns a healthy response.
- `POST /api/analyze` works with pasted text.
- PDF extraction returns readable text.
- DOCX, TXT, Markdown, and other supported file types return readable text.
- Image OCR returns text when Tesseract is installed.
- Missing OCR setup returns a clear setup message.
- Batch extraction combines multi-page uploads in order.
- Analysis results include summary, risk score, risk level, risks, questions, and disclaimer.
- Saved history endpoints work for signed-in users.
- Delete history removes the saved report.

## Frontend Checks

- Landing page loads at `http://localhost:5173`.
- Upload flow works.
- Paste text flow works.
- Extracted text preview is editable.
- Analyze button handles loading and error states.
- Results page shows score, level, summary, detected risks, and questions.
- Risk detail cards expand and explain the triggered clause simply.
- Trigger snippets are visible when available.
- Report download actions work.
- Footer links open the correct docs and GitHub repo.
- Sign-in page is reachable from the top-right nav.
- Layout works on desktop and mobile widths.

## Mobile Checks

- Expo app starts.
- Backend URL can be edited.
- Camera scan workflow opens on a real device.
- Photo picker workflow works.
- Document picker workflow works.
- Mobile analysis screen shows score, summary, risks, and questions.
- Sign-in works against the local backend.
- Save, open, delete, and share actions work.

## Privacy Checks

- The app does not intentionally store original uploaded files.
- Saved history stores reports only after user action.
- Users can delete saved analyses.
- Privacy notice is visible from the footer.
- Disclaimer appears in the product and docs.
- Full document text is not printed into routine logs.

## Content Checks

- Product copy uses educational language.
- The app never says it is a lawyer.
- The app never tells the user whether to sign.
- Risk explanations are written for non-technical users.
- Questions help the user ask for clarification before signing.

## Sample Test Text

Use this text to confirm the main analyzer path:

```text
This agreement includes binding arbitration, automatic renewal, no refunds, a non-compete restriction, personal guarantee, data sharing with third parties, and an early termination fee. The company may modify these terms at any time.
```

Expected result:

- High risk score
- Arbitration detected
- Auto-renewal detected
- Refund restriction detected
- Non-compete detected
- Personal guarantee detected
- Data sharing or privacy risk detected
- Early termination penalty detected
- One-sided modification detected

## Pre-Launch Tasks

- Keep the Android Expo/EAS preview link current until a Google Play release exists.
- Set up iOS TestFlight or registered device testing before advertising iPhone access.
- Add production auth before using real customer accounts.
- Move saved history from local SQLite to managed production storage.
- Add production logging that avoids sensitive document text.
- Add error monitoring.
- Add rate limiting.
- Add file size limits.
- Add terms, privacy, and disclaimer review by a licensed attorney.
- Confirm accessibility basics: contrast, keyboard navigation, and screen-reader labels.

## Release Readiness

The project is ready to demo when:

- Web, backend, and mobile preview start cleanly.
- A pasted agreement can be analyzed end to end.
- At least two uploaded document formats work.
- Report download works.
- Saved history works for a test user.
- The disclaimer is visible.
- The GitHub README links to the docs.
