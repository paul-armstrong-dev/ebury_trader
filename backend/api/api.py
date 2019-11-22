from flask import jsonify
from flask_restful import Resource, Api
from .model_handler import DB_Utils
from .config import Config

api = Api()


class StoredTrades(Resource):
    def get(self):
        return jsonify([trade.toReport() for trade in DB_Utils.get_model_data_engine(Config.SQLALCHEMY_DATABASE_URI,
                                                                                     "Trade")])


api.add_resource(StoredTrades, '/')
