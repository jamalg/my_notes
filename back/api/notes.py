import logging

from flask import Blueprint, jsonify

from back.models import db
from back.models.note import Note
from back.schemas.note import NoteSchema

bp = Blueprint("note", __name__, url_prefix="/api/notes")
logger = logging.getLogger(__name__)


@bp.route("/<int:note_id>")
def get_note(note_id):
    note = db.session.query(Note).get(note_id)
    if note:
        return jsonify(NoteSchema().dump(note).data)
    return jsonify({"message": "No note for id: {}".format(note_id)}), 404


@bp.route("", methods=["GET"])
def get_notes():
    notes = db.session.query(Note).all()
    return jsonify(NoteSchema(many=True).dump(notes).data)
