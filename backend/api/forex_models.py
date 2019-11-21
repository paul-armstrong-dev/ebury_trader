from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, Date, Float, TIMESTAMP, create_engine
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base
from loguru import logger

Base = declarative_base()


class ForexModels:
    @staticmethod
    def recreate_all_models(engine):
        logger.info("Recreating all models")
        Base.metadata.drop_all(engine)
        Base.metadata.create_all(engine)
        logger.info("Models recreated")

    class Currency(Base):
        """ Only dimensional table, here so we can store as ID"""
        __tablename__ = 'dim_currency'
        # One to Many
        currency_id = Column(Integer,
                             primary_key=True,
                             index=True,
                             autoincrement=True)
        description = Column(String(100), nullable=False)
        code = Column(String(3), nullable=False, unique=True)

        created_date_time = Column(DateTime(timezone=True), server_default=func.now())

        def __repr__(self):
            return '<Player %r>' % self.description + ' ' + self.code

    class Sale(Base):
        """ Fact table """
        __tablename__ = 'fct_sales'

        sale_id = Column(Integer,
                         primary_key=True,
                         index=True,
                         autoincrement=True)

        currency_id = Column(Integer,
                             ForeignKey('dim_currency.currency_id'),
                             nullable=False)

        amount = Column(Float, nullable=False)
        # One to Many
        currency = relationship("Currency")#, uselist=True, backref="sale_br")
        trade = relationship("Trade", back_populates="sale")

    class Purchase(Base):
        """ Fact table """
        __tablename__ = 'fct_purchases'
        purchase_id = Column(Integer,
                          primary_key=True,
                          index=True,
                          autoincrement=True)
        currency_id = Column(Integer,
                             ForeignKey('dim_currency.currency_id'),
                             nullable=False)
        amount = Column(Float, nullable=False)

        # One to Many
        currency = relationship("Currency")
        trade = relationship("Trade", back_populates="purchase") #, uselist=True, backref="purchase_br")

    class Trade(Base):
        """ Fact table """
        __tablename__ = 'fct_trades'
        trade_id = Column(Integer,
                          primary_key=True,
                          index=True,
                          autoincrement=True)

        rate = Column(Float, nullable=True)

        purchase_id = Column(Integer, ForeignKey('fct_purchases.purchase_id'))
        sale_id = Column(Integer, ForeignKey('fct_sales.sale_id'))

        # Pretty sure that this would have been simpler to keep it in one,
        # but after working on OLTP DB's for so long to me that is an unacceptable
        # solution for the data model,
        purchase = relationship("Purchase", uselist=False, back_populates="trade")
        sale = relationship("Sale", uselist=False, back_populates="trade")

        # Default columns from a template I created which are generally pretty useful.
        # Nothing I really use them for here though.
        created_date_time = Column(DateTime(timezone=True), server_default=func.now())
        table_status = Column(String(20), nullable=False, server_default="New")

