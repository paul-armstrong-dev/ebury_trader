from api.api import api
from api.config import Config
from api.forex_models import db
from api.model_handler import DbUtils
from flask import Flask
from flask_cors import CORS


def create_app(config):
    """

    :param config:
    :return:
    """
    web_app = Flask(__name__)
    CORS(web_app)
    web_app.config.from_object(config)
    register_extensions(web_app)
    return web_app


def register_extensions(web_app):
    """

    :param web_app:
    :return:
    """
    api.init_app(web_app)
    db.init_app(web_app)
    DbUtils.recreate_db(Config.SQLALCHEMY_DATABASE_URI)


if __name__ == '__main__':
    app = create_app(Config)
    app.run(host='0.0.0.0', port=80, threaded=True)
