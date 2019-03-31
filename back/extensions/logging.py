import logging

from back.config import config


def configure_console_handler(logger: logging.Logger) -> None:
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.DEBUG)

    logger.addHandler(console_handler)


def configure_logger(logger: logging.Logger) -> None:
    logger.setLevel(config.LOG_LEVEL_ROOT)
    configure_console_handler(logger)
