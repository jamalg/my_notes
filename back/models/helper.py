import logging
from typing import Dict, Union

from sqlalchemy.ext.declarative import declarative_base
from marshmallow import Schema
from back.utils.sqlalchemy.helpers import session_manager

from back.models import db
from back.schemas.category import CategorySchema
from back.schemas.folder import FolderSchema
from back.schemas.note import NoteSchema

logger = logging.getLogger(__name__)
DeclarativeBase = declarative_base()


def add_one(data: Dict, schema: Schema) -> Union[str, int]:
    resource, errors = schema().load(data)
    if errors:
        raise Exception(errors)

    with session_manager(db.UnscopedSession) as db_session:
        db_session.add(resource)
        db_session.commit()
        logger.info(
            "Added {} to db".format(resource.__class__.__name__),
            extra={resource.primary_key_name: resource.primary_key}
        )
        return schema().dump(resource).data


def add_category(category_data: Dict) -> int:
    return add_one(category_data, CategorySchema)


def add_folder(folder_data: Dict) -> int:
    return add_one(folder_data, FolderSchema)


def add_note(note_data: Dict) -> int:
    return add_one(note_data, NoteSchema)
