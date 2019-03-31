import logging

from flask import Blueprint, jsonify

from back.models import db
from back.models.category import Category
from back.schemas.category import CategorySchema

bp = Blueprint("category", __name__, url_prefix="/api/categories")
logger = logging.getLogger(__name__)


@bp.route("/<int:category_id>")
def get_category(category_id):
    category = db.session.query(Category).get(category_id)
    if category:
        return jsonify(CategorySchema().dump(category).data)
    return jsonify({"message": "No category for id: {}".format(category_id)}), 404


@bp.route("", methods=["GET"])
def get_categories():
    categories = db.session.query(Category).all()
    return jsonify(CategorySchema(many=True).dump(categories).data)
