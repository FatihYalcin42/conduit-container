import os


class Config:
    APP_NAME = os.getenv("APP_NAME", "conduit-backend")
    APP_ENV = os.getenv("APP_ENV", "development")
    APP_HOST = os.getenv("APP_HOST", "0.0.0.0")
    APP_PORT = int(os.getenv("APP_PORT", "8000"))

    POSTGRES_DB = os.getenv("POSTGRES_DB", "conduit")
    POSTGRES_USER = os.getenv("POSTGRES_USER", "conduit")
    POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "change_me")
    POSTGRES_HOST = os.getenv("POSTGRES_HOST", "db")
    POSTGRES_PORT = int(os.getenv("POSTGRES_PORT", "5432"))
    POSTGRES_SSLMODE = os.getenv("POSTGRES_SSLMODE", "prefer")

    @classmethod
    def postgres_dsn(cls) -> str:
        return (
            f"dbname={cls.POSTGRES_DB} "
            f"user={cls.POSTGRES_USER} "
            f"password={cls.POSTGRES_PASSWORD} "
            f"host={cls.POSTGRES_HOST} "
            f"port={cls.POSTGRES_PORT} "
            f"sslmode={cls.POSTGRES_SSLMODE}"
        )

