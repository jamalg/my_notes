from marshmallow import fields

from back.models.category import Category
from back.schemas.base import BaseSchema
from back.schemas.folder import FolderSchema


class CategorySchema(BaseSchema):
    __model__ = Category

    id = fields.Integer()
    name = fields.String(required=True, allow_none=False)

    folders = fields.Nested(FolderSchema, many=True, dump_only=True, only=("id", "name", "image_url", "type"))
