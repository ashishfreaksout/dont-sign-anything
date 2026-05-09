# Model Card

## Model Name

Don't Sign Anything! Explainable Agreement Risk Analyzer

## Version

MVP rule-based NLP engine, current repository version.

## Model Type

Deterministic rule-based NLP pipeline.

This is not a trained machine-learning model, neural network, or LLM. The word "model" in this project refers to the structured analysis logic: document type profiles, clause rules, confidence heuristics, scoring weights, and report generation templates.

## Intended Use

The analyzer helps users review agreements before signing by surfacing educational risk signals.

Intended outputs:

- Plain-English document summary
- Document type classification
- Potential risky clause findings
- Trigger terms and matched snippets
- Risk score from 0 to 100
- Low, Medium, or High risk level
- Questions to ask before signing
- Reminder that this is not legal advice

## Out-of-Scope Use

The analyzer must not be used as:

- Legal advice
- A replacement for a licensed attorney
- A guarantee that a contract is safe
- A guarantee that a clause is enforceable or unenforceable
- A production compliance decision system
- A credit, employment, housing, insurance, or legal eligibility decision system

## Inputs

| Input | Description |
| --- | --- |
| `text` | Agreement text from paste, PDF extraction, document extraction, or OCR. |
| `document_name` | Optional display name for the report. |
| `preferences` | Optional user preferences that increase scoring weight for privacy, hidden fees, employment restrictions, or cancellation/refund risks. |

## Outputs

| Output | Description |
| --- | --- |
| `document_type` | Rule-based document classification, such as lease, employment agreement, terms of service, privacy policy, waiver, or NDA. |
| `document_type_confidence` | Confidence based on matched type-specific signals. |
| `summary` | Short plain-English summary. |
| `risk_score` | Product risk score from 0 to 100. |
| `risk_level` | Low, Medium, or High. |
| `detected_risks` | List of risk findings with severity, confidence, explanations, questions, triggers, and snippets. |
| `obligations` | Sentences that contain obligation-like terms. |
| `deadlines` | Sentences that contain deadline or notice-like terms. |
| `parties` | Possible named parties and roles. |
| `disclaimer` | Legal disclaimer. |

## Analysis Method

The pipeline runs in this order:

1. Normalize spacing and clean text.
2. Classify document type using weighted keyword/phrase signals.
3. Run each clause rule against the text using regular expressions.
4. Store trigger terms and source snippets for each matched risk.
5. Estimate confidence from match count, unique triggers, document type fit, and severity.
6. Sort findings by severity and confidence.
7. Calculate score using severity weights, confidence bonuses, document type adjustments, preference adjustments, and breadth penalty.
8. Generate summary, questions, next steps, and disclaimer.

## Supported Risk Categories

The current analyzer covers:

- Arbitration
- Auto-renewal
- Cancellation restriction
- Early termination penalty
- Hidden fees
- Liability waiver
- Non-compete
- Non-solicit
- Data sharing/privacy risk
- Refund restriction
- One-sided modification
- Personal guarantee
- Payment acceleration/collection costs
- Intellectual property ownership
- Confidentiality
- Governing law/venue
- Assignment
- Indemnification
- One-sided termination
- Medical care consent

## Performance Expectations

Expected strengths:

- Fast local analysis
- Clear explanations
- Repeatable results
- Easy debugging
- No paid AI API dependency
- Strong results when agreements use common clause wording

Expected weaknesses:

- May miss uncommon wording or highly indirect legal language
- May flag clauses that are harmless in context
- Does not reason about jurisdiction-specific enforceability
- Does not compare clauses against statutes or case law
- OCR quality can affect detection accuracy
- Summaries are extractive/template-based, not deep semantic summaries

## Confidence Interpretation

Confidence means "strength of pattern match," not legal certainty.

Example:

- High confidence: the analyzer found clear phrases such as `binding arbitration`, `no refunds`, or `personal guarantee`.
- Medium confidence: the analyzer found related language but with less direct phrasing.
- Low confidence: the analyzer found weak or limited text signals.

## Scoring Interpretation

The risk score is a product heuristic. It helps users prioritize what to review first.

It should be read as:

- Low: fewer known risk signals were detected
- Medium: several review-worthy signals were detected
- High: multiple or serious signals were detected

It should not be read as:

- Legal risk percentage
- Probability of losing money
- Legal enforceability score
- Recommendation to sign or not sign

## Safety And Disclaimers

The app uses careful educational language:

- "Potential risk detected"
- "Plain-English explanation"
- "Questions to ask before signing"
- "This is not legal advice"
- "Consult a licensed attorney for legal decisions"

The analyzer should not generate definitive legal conclusions.

## Privacy

The MVP is designed to avoid storing uploaded source files. Text is processed for extraction and analysis. Saved history stores analysis reports only when a signed-in user intentionally saves them.

Production hardening should include:

- Managed database
- Strong production auth
- Encrypted storage
- Rate limiting
- Sensitive logging controls
- Clear retention and deletion policies

## Evaluation Plan

The current project can be evaluated with a small labeled set of agreement snippets.

Recommended test matrix:

| Test Type | Example |
| --- | --- |
| Positive clause tests | Snippets containing `binding arbitration`, `automatic renewal`, `no refunds`, etc. should trigger expected rules. |
| Negative clause tests | Ordinary agreement text without risk patterns should avoid false positives. |
| Document type tests | Lease, employment, privacy, and NDA samples should classify correctly. |
| OCR noise tests | Scanned text with spacing errors should still trigger common patterns where possible. |
| Scoring tests | More severe and broader findings should produce higher scores. |

## Future Improvements

Planned model improvements:

- Larger pattern library
- Labeled evaluation dataset
- False-positive and false-negative test suite
- Optional LLM summary with rule-based fallback
- Clause embeddings for semantic matching
- Better OCR cleanup
- Document-type-specific rule packs
- Multilingual clause detection

## Responsible Positioning

This project is best described as:

> An educational document risk assistant with an explainable rule-based NLP engine.

It should not be described as:

> An AI lawyer, legal advisor, or automated legal decision system.
