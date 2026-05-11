from psycopg import connect
from psycopg.rows import dict_row

from app.config import Config


def get_connection():
    return connect(Config.postgres_dsn(), row_factory=dict_row)


def check_database() -> dict:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute("SELECT current_database() AS database_name, version() AS version")
            row = cursor.fetchone()

    return {
        "database_name": row["database_name"],
        "version": row["version"],
    }

