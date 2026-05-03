import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import analysis, auth, documents, history
from app.services.storage import init_database


def _get_allowed_origins() -> list[str]:
    configured_origins = os.getenv("ALLOWED_ORIGINS", "")
    if configured_origins.strip():
        return [origin.strip() for origin in configured_origins.split(",") if origin.strip()]

    return [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://ashishfreaksout.github.io",
    ]


app = FastAPI(
    title="Don't Sign Anything API",
    description="Educational document risk assistant API for Phase 1.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=_get_allowed_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(documents.router)
app.include_router(analysis.router)
app.include_router(auth.router)
app.include_router(history.router)


@app.on_event("startup")
def startup() -> None:
    init_database()


@app.get("/api/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}
