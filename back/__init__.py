import logging

from back.extensions.logging import configure_logger

root_logger = logging.getLogger("")

configure_logger(root_logger)
