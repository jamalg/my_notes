from typing import Dict

from marshmallow import Schema, post_load, fields


class BaseSchema(Schema):
    __model__ = None

    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)

    @post_load
    def make_object(self, data: Dict) -> object:
        if self.__model__ is None or self.partial:
            return data
        return self.__model__(**data)
