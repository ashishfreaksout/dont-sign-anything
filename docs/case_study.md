# Case Study: Don't Sign Anything!

## Overview

Don't Sign Anything! is an educational document risk assistant that helps people pause before signing agreements they do not fully understand. Users can paste agreement text, upload documents, scan physical pages, and receive a plain-English report that highlights potential risks, obligations, deadlines, and questions to ask before signing.

The product does not claim to be a lawyer. It is built to explain possible issues, not to make legal decisions for the user.

## Problem

Many people sign leases, job documents, waivers, subscriptions, service contracts, and online terms without reading every sentence. Even when they do read them, contracts often use language that is hard to understand.

The common user questions are simple:

- What am I agreeing to?
- What could cost me money later?
- Can I cancel?
- Am I giving up any rights?
- Is my data being shared?
- What should I ask before signing?

## Product Goal

The goal is to make agreement review less intimidating for regular people.

The app gives users:

- A short document summary
- A risk score from 0 to 100
- A Low, Medium, or High risk level
- Detected risky clauses
- Simple explanations for each detected issue
- Specific questions to ask before signing
- A clear reminder that this is not legal advice

## Target Users

Primary users:

- Renters reviewing a lease
- Employees reviewing offer letters or workplace agreements
- Freelancers reviewing client contracts
- Consumers reviewing subscriptions, refund policies, waivers, or terms of service
- Small business owners reviewing vendor agreements

These users may not know legal terms. The product language should be simple enough for a non-technical person to understand.

## Scope Strategy

The project is intentionally phased. The first versions focus on a useful web app instead of trying to build every platform at once.

Implemented foundations:

- Web app with upload and paste analysis
- FastAPI backend
- Rule-based clause detection
- PDF and common file text extraction
- OCR path for scanned images
- Local accounts and saved analysis history
- Full report download
- Expo mobile app scaffold that reuses the backend

Deferred areas:

- Production authentication provider
- App Store and Google Play publishing
- Browser extension
- Attorney referral workflow
- Paid LLM features
- Team workspace mode

## Key Design Decisions

### Explainable Rules First

The first analyzer is rule-based. This makes risk categories easier to explain and debug. If the app flags an arbitration clause, it can show the exact phrase that triggered the finding.

This approach avoids a fully black-box result and keeps the app useful even without a paid AI API.

### Plain-English Explanations

Risk findings are written in everyday language. For example:

- "This may make you use private arbitration instead of going to court."
- "This may renew your agreement automatically unless you cancel early."
- "This may make you pay extra fees that are not obvious at first."

The goal is not to replace legal review. The goal is to help users notice things worth asking about.

### Privacy-Minded MVP

Documents can contain sensitive personal, financial, employment, or business information. The MVP avoids permanently storing uploaded source files. Saved history stores analysis reports only when a signed-in user chooses to save them.

### Expandable Architecture

The backend is split into focused services:

- Document extraction
- OCR
- Document classification
- Risk analysis
- Scoring
- Summarization
- Storage

This keeps the project ready for later improvements without forcing those features into the MVP.

## User Flow

1. User opens the web app.
2. User uploads a document, scans pages, or pastes agreement text.
3. App extracts editable text.
4. User clicks Analyze.
5. Backend classifies the document and detects possible risky clauses.
6. Results page shows a score, summary, detected risks, plain-English explanations, source snippets, and questions to ask.
7. User can download a full report or save the analysis if signed in.

## Current Capabilities

The app currently detects signals such as:

- Arbitration
- Auto-renewal
- Cancellation restrictions
- Early termination fees
- Hidden fees
- Liability waivers
- Non-compete clauses
- Non-solicit clauses
- Data sharing and privacy risks
- Refund restrictions
- One-sided modification clauses
- Personal guarantees
- Payment acceleration
- Intellectual property ownership
- Confidentiality
- Governing law and venue
- Assignment
- Indemnification
- One-sided termination
- Medical care consent

## What Makes The Project Portfolio-Ready

This project demonstrates:

- Full-stack product thinking
- REST API design
- Frontend state and results presentation
- Rule-based NLP workflow
- Document upload and extraction
- OCR-ready backend design
- Local persistence with SQLite
- Privacy-aware product positioning
- Phased roadmap planning
- Mobile reuse of backend APIs

## Limitations

The app can miss important terms if they are written in unusual language. It can also flag clauses that are not actually risky in a specific situation. Some scanned documents may produce imperfect OCR text.

For that reason, every report should be treated as an educational starting point, not a final legal review.

## Future Improvements

Planned improvements include:

- Better document-type-specific scoring
- More clause patterns from real examples
- Optional LLM summaries with a rule-based fallback
- Better OCR cleanup
- Browser extension support
- Native mobile release
- PDF export
- Contract version comparison
- Question-answering over the document

## Disclaimer

This is not legal advice. Don't Sign Anything! provides educational risk signals, plain-English explanations, and questions to consider. Users should consult a licensed attorney for legal decisions.
