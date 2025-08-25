import os

# Load DB URL from environment variable or fallback
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:chama@localhost:5432/store"
)
