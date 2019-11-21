from flask import Flask
from flask_cors import CORS

from api.api import api
from api.models import db
from api.config import Config
from api.model_handler import DB_Utils

def create_app(config):
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(config)
    register_extensions(app)
    return app


def register_extensions(app):
    api.init_app(app)
    db.init_app(app)

#app = create_app(Config)


# Run the application
if __name__ == '__main__':
     app = create_app(Config)
     DB_Utils.recreate_db(Config.SQLALCHEMY_DATABASE_URI)
     DB_Utils.add_test_trade(Config.SQLALCHEMY_DATABASE_URI)
     app.run(host='0.0.0.0', port=80, threaded=True)
