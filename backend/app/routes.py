from flask import Blueprint, jsonify

from app.config import Config
from app.db import check_database

api = Blueprint("api", __name__)

ARTICLES = [
    {
        "slug": "container-checklist-overview",
        "title": "Container Checklist Overview",
        "description": "A compact summary of the current Docker-based project setup.",
        "body": (
            "This article explains the current scaffold, the service boundaries, "
            "and the runtime checks that are already in place."
        ),
        "author": {"username": "fatih", "role": "student"},
        "tagList": ["docker", "compose", "checklist"],
        "favoritesCount": 12,
    },
    {
        "slug": "vm-deployment-notes",
        "title": "VM Deployment Notes",
        "description": "What needs to be verified once the stack runs on the cloud VM.",
        "body": (
            "The main deployment target is the cloud VM on port 8282. "
            "The frontend should stay reachable externally and the backend should "
            "continue to load data through the reverse proxy."
        ),
        "author": {"username": "ops-guide", "role": "mentor-helper"},
        "tagList": ["vm", "deployment", "ports"],
        "favoritesCount": 8,
    },
    {
        "slug": "security-review-basics",
        "title": "Security Review Basics",
        "description": "A checklist for avoiding secrets and sensitive configuration in Git.",
        "body": (
            "Keep real passwords, tokens, private keys, and production-only values "
            "out of the repository. Use .env files on the target machine instead."
        ),
        "author": {"username": "security-bot", "role": "reviewer"},
        "tagList": ["security", "env", "git"],
        "favoritesCount": 21,
    },
]


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


@api.get("/articles")
def articles():
    return jsonify({"articles": ARTICLES, "articlesCount": len(ARTICLES)}), 200


@api.get("/app-summary")
def app_summary():
    return jsonify(
        {
            "project": "Conduit Container",
            "summary": (
                "Multi-container setup with frontend, Flask backend, and PostgreSQL. "
                "Designed for local Docker development and VM deployment on port 8282."
            ),
            "navigation": ["home", "system", "about"],
            "highlights": [
                "Frontend served by Nginx",
                "Backend runs through Gunicorn",
                "Database health is checked through the backend",
            ],
        }
    ), 200


@api.get("/")
def index():
    return jsonify(
        {
            "service": Config.APP_NAME,
            "message": "Backend is running.",
            "available_endpoints": ["/health", "/db-health", "/articles", "/app-summary"],
        }
    ), 200
