from loguru import logger
from sqlalchemy import create_engine
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from sqlalchemy.orm.exc import NoResultFound

from .forex_models import ForexModels


class DbUtils:
    """ Left all of these as static methods to try simplify the db session management,
    Ideally going forward I would like create a session / context handler which we would
    call using with session(): - but think this is a safe quick implementation"""

    @staticmethod
    def get_or_create(session, model, **kwargs):
        """ Here to managed dimension mapping """
        try:
            return session.query(model).filter_by(**kwargs).one()
        except NoResultFound:
            try:
                with session.begin_nested():
                    instance = model(**kwargs)
                    session.add(instance)
                    return instance
            except IntegrityError:
                return None

    @staticmethod
    def recreate_db(engine_uri):
        logger.info("Recreating DB engine")
        engine = create_engine(engine_uri, echo=True)
        logger.info("Engine recreated")
        ForexModels.recreate_all_models(engine)
        return engine

    @staticmethod
    def get_model_data(engine_uri, model_name):
        """
            Returns model data from EngineURI(full conn string) based on Name in Forex models;

        :param engine_uri:
        :param engine_uri: Full connection string for engine, included from Config
        :param model_name: Must be in ForexModels.*
        :return:
        """
        engine = create_engine(engine_uri, echo=True)
        s = Session(bind=engine)
        model = getattr(ForexModels, model_name)
        query_results = s.query(model)

        if query_results.count() == 0:
            logger.error("No results")
            s.close()
        else:
            s.close()
            return query_results.all()

    @staticmethod
    def store_new_trade(engine_uri,
                        buy_amount,
                        buy_currency,
                        sale_amount,
                        sale_currency,
                        rate):
        """

        :param engine_uri:
        :param buy_amount:
        :param buy_currency:
        :param sale_amount:
        :param sale_currency:
        :param rate:
        :return:
        """
        engine = create_engine(engine_uri, echo=True)
        session = Session(bind=engine)
        trade = ForexModels.Trade(rate=rate,
                                  buy_amount=buy_amount,
                                  sale_amount=sale_amount,
                                  buy_currency_code=buy_currency,
                                  sale_currency_code=sale_currency)

        session.add(trade)
        session.commit()
        session.close()
        return True

    @staticmethod
    def add_test_trade(engine_uri):
        DbUtils.store_new_trade(engine_uri=engine_uri,
                                buy_amount=4444,
                                buy_currency="EUR",
                                sale_amount=122,
                                sale_currency="GBP",
                                rate=1.2)
