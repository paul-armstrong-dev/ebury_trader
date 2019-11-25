from api.api import api
from api.config import app_config
from api.forex_models import db
from api.model_handler import DbUtils
from flask import Flask
from flask_cors import CORS
from loguru import logger
import os

def create_app(config_name):
    """

    :param config:
    :return:
    """
    logger.info(f"Setting up flask backend for {config_name}")
    web_app = Flask(__name__, instance_relative_config=True)
    CORS(web_app)
    config=app_config[config_name]
    web_app.config.from_object(config)
    register_extensions(web_app)
    DbUtils.recreate_db(config.SQLALCHEMY_DATABASE_URI)
    logger.info("Flask backend successfully created")
    return web_app


def register_extensions(web_app):
    """

    :param web_app:
    :return:
    """
    logger.info("Registering extensions")
    api.init_app(web_app)
    db.init_app(web_app)
    logger.info("Extensions registered")

# Loguru function, centralizes logging and provides better exceptions
with logger.catch():
    if __name__ == '__main__':
        config_name = os.environ.get("APP_ENVIRONMENT")
        app = create_app(config_name)
        app.run(host='0.0.0.0', port=80, threaded=True)
