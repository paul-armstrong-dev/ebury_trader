from flask_sqlalchemy import SQLAlchemy
from loguru import logger
from sqlalchemy import Column, Integer, String, DateTime, Float
from sqlalchemy.sql import func

db = SQLAlchemy()


class ForexModels:
    """
         Ran into tons of issues with my 3 layer data model, figured that if I try and K.I.S.S,
         that model likely is not necessary (there are also 2 one to one relations, which is not ideal)
         Check commit history for data model implementation should you need to store this data over years,
         but really didn't see the need for this
        """

    @staticmethod
    def recreate_all_models(engine):
        logger.info("Recreating all models")
        db.metadata.drop_all(engine)
        db.metadata.create_all(engine)
        logger.info("Models recreated")

    class Trade(db.Model):
        """ Fact table """
        __tablename__ = 'fct_trades'
        trade_id = Column(Integer,
                          primary_key=True,
                          index=True,
                          autoincrement=True)

        sale_amount = Column(Float, nullable=False)
        sale_currency_code = Column(String(3), nullable=False)
        buy_amount = Column(Float, nullable=False)
        buy_currency_code = Column(String(3), nullable=False)
        rate = Column(Float, nullable=True)

        # Default columns from a template I created which are generally pretty useful.
        # Nothing I really use them for here though.
        created_date_time = Column(DateTime(timezone=True), server_default=func.now())
        table_status = Column(String(20), nullable=False, server_default="New")

        def toReport(self):
            """ Simple function for structuring data according to spec"""
            return {"trade_id": self.trade_id,
                    "Sell_CCY": self.sale_currency_code,
                    "Sell_Amount": self.sale_amount,
                    "Buy_CCY": self.buy_currency_code,
                    "Buy_Amount": self.buy_amount,
                    "Rate": self.rate,
                    "Date_Booked": self.created_date_time.__str__()}
