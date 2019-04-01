from flask import Flask

from back.models import db
from back.models.category import Category  # noqa
from back.models.folder import Folder  # noqa
from back.models.note import Note  # noqa


def init_app(app: Flask) -> None:

    @app.teardown_request
    def remove_session(response_or_exc):
        db.session.remove()
        return response_or_exc
