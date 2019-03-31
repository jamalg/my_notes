from marshmallow import fields

from back.models.note import Note
from back.schemas.base import BaseSchema


class NoteSchema(BaseSchema):
    __model__ = Note

    id = fields.Integer(dump_only=True)
    title = fields.String(required=True)
    tags = fields.List(fields.String, allow_none=True)
    body = fields.Raw()
    folder_id = fields.Integer(required=False)
