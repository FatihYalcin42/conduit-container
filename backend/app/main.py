from flask import Flask, jsonify
from werkzeug.exceptions import HTTPException

from app.routes import api


def create_app() -> Flask:
    app = Flask(__name__)
    app.register_blueprint(api)

    @app.errorhandler(Exception)
    def handle_unexpected_error(error):
        if isinstance(error, HTTPException):
            return jsonify({"status": "error", "message": error.description}), error.code

        return jsonify({"status": "error", "message": str(error)}), 500

    return app
