from flask import Blueprint, jsonify

bp = Blueprint("health", __name__, url_prefix="/api/health")


@bp.route("/")
def ok():
    return jsonify({"message": "healthy"}), 200
