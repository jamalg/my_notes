from flask import Flask
from flask_cors import CORS

from back.api.health import bp as health_bp
from back.api.category import bp as category_bp
from back.api.folder import bp as folder_bp
from back.api.notes import bp as notes_bp


def init_app(app: Flask) -> None:
    app.register_blueprint(health_bp)
    app.register_blueprint(category_bp)
    app.register_blueprint(folder_bp)
    app.register_blueprint(notes_bp)

    CORS(app)
