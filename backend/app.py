from api.api import api
from api.config import app_config
from api.forex_models import db
from api.model_handler import DbUtils
from flask import Flask
from flask_cors import CORS
import os

def create_app(config_name):
    """

    :param config:
    :return:
    """
    web_app = Flask(__name__, instance_relative_config=True)
    CORS(web_app)
    config=app_config[config_name]
    web_app.config.from_object(config)
    register_extensions(web_app)
    # DbUtils.recreate_db(config)
    return web_app


def register_extensions(web_app):
    """

    :param web_app:
    :return:
    """
    api.init_app(web_app)
    db.init_app(web_app)


if __name__ == '__main__':
    import os
    config_name = os.environ.get("APP_ENVIRONMENT")
    app = create_app(config_name)
    app.run(host='0.0.0.0', port=80, threaded=True)
