# Product Brief

## Product Name

Don't Sign Anything!

## Positioning

Don't Sign Anything! is an educational document risk assistant. It helps users understand possible risks before signing agreements by summarizing the document, flagging concerning clauses, and explaining them in plain English.

It is not a lawyer and does not provide legal advice.

## One-Sentence Pitch

Upload or paste an agreement and get a plain-English risk report before you sign.

## Problem Statement

People often sign documents without understanding the practical consequences. Important terms can be hidden inside long sections, dense wording, or unfamiliar legal phrases.

## MVP Value

The MVP helps users answer:

- What is this document about?
- What are my main obligations?
- What deadlines or cancellation rules should I notice?
- What clauses could create risk?
- What questions should I ask before signing?

## Product Principles

- Use plain English.
- Show why a risk was detected.
- Keep the user in control.
- Avoid legal-advice claims.
- Treat documents as sensitive.
- Build in phases.

## Technical Approach

The current analyzer is an explainable rule-based NLP engine. It does not depend on a trained legal AI model or paid LLM. The backend classifies document type with weighted keyword signals, detects risky clause patterns, extracts source snippets, calculates confidence and risk score, then returns plain-English explanations and questions.

This makes the MVP easier to inspect in a portfolio review because each finding can be traced to the words that triggered it.

## Primary Features

- Paste text or upload documents
- Extract text from files
- Analyze agreement text
- Detect risky clauses
- Classify document type
- Show risk score and severity
- Explain each issue simply
- Show source snippets for more detail
- Generate a downloadable full report
- Save reports when signed in
- Support OCR for scanned images
- Reuse backend APIs in the mobile app

## Non-Goals

The product should not:

- Tell users whether a contract is legally valid
- Tell users whether they should sign
- Replace an attorney
- Store original uploaded documents by default
- Analyze webpages without explicit user action
- Promise perfect detection

## Language Guide

Use:

- Potential risk detected
- Plain-English explanation
- Questions to ask before signing
- This may mean...
- Ask before signing...
- Consult a licensed attorney for legal decisions

Avoid:

- Legal advice
- Lawyer replacement
- This contract is safe
- This clause is illegal
- Guaranteed review
- You should sign
- You should not sign

## Success Metrics

Early product metrics:

- User can complete analysis without help
- Extracted text is visible before analysis
- Results clearly show the biggest risks first
- Users understand at least one question to ask before signing
- Users can download or save the report

Technical metrics:

- Backend health endpoint responds
- Text extraction works for supported file types
- Analysis endpoint returns stable structured results
- Rule-based fallback works without paid APIs
- Uploaded source files are not intentionally retained

## Phase Summary

- Phase 1: Web app MVP with upload, paste, extraction, rule-based analysis, score, and dashboard
- Phase 2: Document classification, confidence, snippets, better patterns, and report export
- Phase 3: Accounts, saved history, rename, delete, and preferences
- Phase 4: OCR and scan workflow
- Phase 5: Mobile app scaffold using Expo
- Phase 6: Browser extension
- Phase 7: Advanced product features
