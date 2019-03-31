import logging

from flask import Flask
from back.utils.config_class import BaseConfig, EnvironmentVariable, BoolEnvironmentVariable


class Config(BaseConfig):
    # App settings
    # --> General
    APP_NAME = "notes"
    APP_URL = "http://localhost"
    ENVIRONMENT = EnvironmentVariable()
    TESTING = BoolEnvironmentVariable(default=False)
    LOG_LEVEL_CONSOLE = logging.INFO
    LOG_LEVEL_ROOT = logging.INFO

    # External Services
    # --> DB
    POSTGRES_USER = EnvironmentVariable()
    POSTGRES_PASSWORD = EnvironmentVariable()
    POSTGRES_DB = EnvironmentVariable()
    POSTGRES_DB_TEST = EnvironmentVariable()
    POSTGRES_HOST = EnvironmentVariable()

    def __init__(self) -> None:
        if self.TESTING:
            self.POSTGRES_DB = self.POSTGRES_DB_TEST

    @property
    def SQLALCHEMY_DATABASE_URI(self) -> str:
        return "postgresql://{}:{}@{}:5432/{}".format(
            self.POSTGRES_USER, self.POSTGRES_PASSWORD, self.POSTGRES_HOST, self.POSTGRES_DB
        )


config = Config()


def init_app(app: Flask) -> None:
    app.config.from_object(config)
