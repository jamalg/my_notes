from marshmallow import fields
from marshmallow_enum import EnumField

from back.schemas.base import BaseSchema
from back.schemas.note import NoteSchema
from back.models.folder import FolderType, Folder


class FolderSchema(BaseSchema):
    __model__ = Folder

    id = fields.Integer()
    name = fields.String(required=True)
    type = EnumField(FolderType, required=True)
    image_url = fields.URL(required=False, allow_none=True)
    category_id = fields.Integer(required=True)
    notes = fields.Nested(NoteSchema, many=True, dump_only=True, only=("id", "title", "tags"))
