from flask import jsonify
from flask_restful import reqparse, Api, Resource

from .config import Config
from .model_handler import DB_Utils

api = Api()

parser = reqparse.RequestParser()


class StoredTrades(Resource):
    def get(self):
        return jsonify([trade.toReport() for trade in DB_Utils.get_model_data_engine(Config.SQLALCHEMY_DATABASE_URI,
                                                                                     "Trade")])

    def post(self):
        args = parser.parse_args()
        return 201


api.add_resource(StoredTrades, '/', endpoint='trades')
