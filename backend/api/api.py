from flask import jsonify
from flask_restful import Resource, Api
from .models import Player as PlayerModel, to_dict
from .model_handler import DB_Utils
from .config import Config

api = Api()

class Player(Resource):
    def get(self):
        return jsonify([to_dict(player) for player in PlayerModel.query.all()])


class CurrencyG(Resource):
    def get(self):
        return jsonify([to_dict(player) for player in DB_Utils.get_model_data_engine(Config.SQLALCHEMY_DATABASE_URI,
                                                                                     "Currency")])


class StoredTrades(Resource):
    def get(self):
        return jsonify([to_dict(player) for player in DB_Utils.get_model_data_engine(Config.SQLALCHEMY_DATABASE_URI,
                                                                                     "Trade")])


api.add_resource(StoredTrades, '/')
api.add_resource(CurrencyG, '/cu')