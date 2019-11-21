from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, Date, Float, TIMESTAMP, create_engine
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base
from loguru import logger

Base = declarative_base()


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
        Base.metadata.drop_all(engine)
        Base.metadata.create_all(engine)
        logger.info("Models recreated")

    class Trade(Base):
        """ Fact table """
        __tablename__ = 'fct_trades'
        trade_id = Column(Integer,
                          primary_key=True,
                          index=True,
                          autoincrement=True)

        sale_amount = Column(Float, nullable=False)
        sale_currency_code = Column(String(3), nullable=False)
        purchase_amount = Column(Float, nullable=False)
        purchase_currency_code = Column(String(3), nullable=False)
        rate = Column(Float, nullable=True)

        # Default columns from a template I created which are generally pretty useful.
        # Nothing I really use them for here though.
        created_date_time = Column(DateTime(timezone=True), server_default=func.now())
        table_status = Column(String(20), nullable=False, server_default="New")

