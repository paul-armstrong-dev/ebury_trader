from flask import jsonify
from flask_restful import reqparse, Api, Resource
from .config import Config
from .model_handler import DbUtils

api = Api()


class StoredTrades(Resource):

    def get(self):
        trades = DbUtils.get_model_data(engine_uri=Config.SQLALCHEMY_DATABASE_URI,
                                        model_name="Trade")
        if len(trades)>0:
            return jsonify(trade.to_report() for trade in trades)
        else:
            return jsonify("No trades found")

    def post(self):
        # Parse args
        parser = reqparse.RequestParser()
        parser.add_argument('buy')
        parser.add_argument('sell')
        parser.add_argument('rate')
        parser.add_argument('amount')
        parser.add_argument('result')
        args = parser.parse_args()

        # Store to vars
        buy_currency = args.get("buy")
        sell_currency = args.get("sell")
        trade_rate = args.get("rate")
        input_amount = args.get("amount")
        trade_result = args.get("result")

        # Store to DB
        DbUtils.store_new_trade(engine_uri=Config.SQLALCHEMY_DATABASE_URI,
                                buy_amount=trade_result,
                                buy_currency=buy_currency,
                                sale_amount=input_amount,
                                sale_currency=sell_currency,
                                rate=trade_rate
                                )
        return 201


api.add_resource(StoredTrades, '/trades')
