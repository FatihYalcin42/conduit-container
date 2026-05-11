from flask import Blueprint, jsonify

from app.config import Config
from app.db import check_database

api = Blueprint("api", __name__)


@api.get("/health")
def health():
    return jsonify(
        {
            "status": "ok",
            "service": Config.APP_NAME,
            "environment": Config.APP_ENV,
        }
    ), 200


@api.get("/db-health")
def database_health():
    database_info = check_database()
    return jsonify({"status": "ok", "database": database_info}), 200


@api.get("/")
def index():
    return jsonify(
        {
            "service": Config.APP_NAME,
            "message": "Backend is running.",
            "available_endpoints": ["/health", "/db-health"],
        }
    ), 200

