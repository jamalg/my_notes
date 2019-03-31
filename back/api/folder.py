import logging

from flask import Blueprint, jsonify

from back.models import db
from back.models.folder import Folder
from back.schemas.folder import FolderSchema

bp = Blueprint("folder", __name__, url_prefix="/api/folders")
logger = logging.getLogger(__name__)


@bp.route("/<int:folder_id>")
def get_folder(folder_id):
    folder = db.session.query(Folder).get(folder_id)
    if folder:
        return jsonify(FolderSchema().dump(folder).data)
    return jsonify({"message": "No folder for id: {}".format(folder_id)}), 404


@bp.route("", methods=["GET"])
def get_folders():
    folders = db.session.query(Folder).all()
    return jsonify(FolderSchema(many=True).dump(folders).data)
