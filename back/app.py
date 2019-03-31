from flask import Flask

from back import api, config, cli


def create_app() -> Flask:
    app = Flask(__name__)

    config.init_app(app)
    api.init_app(app)
    cli.init_app(app)

    return app
