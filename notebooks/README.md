# Notebooks

This folder contains lightweight walkthrough notebooks for the Don't Sign Anything! analysis engine.

## Available Notebooks

- `rule_based_nlp_walkthrough.ipynb`  
  Demonstrates how the rule-based NLP analyzer classifies a sample agreement, detects risky clauses, assigns confidence, calculates a risk score, and returns plain-English explanations.

## Running Locally

From the repository root:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cd ..
jupyter notebook notebooks/rule_based_nlp_walkthrough.ipynb
```

If Jupyter is not installed in your environment:

```bash
pip install notebook
```

The notebook imports the backend analyzer directly. It does not call an external AI API.
