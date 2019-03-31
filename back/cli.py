from flask import Flask

from back.scripts.populate import populate


def init_app(app: Flask) -> None:
    app.cli.add_command(populate)
