from sqlalchemy import create_engine
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from sqlalchemy.orm.exc import NoResultFound
from loguru import logger
from .forex_models import ForexModels
import pandas as pd



class DB_Utils:
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
        # DB_Utils.populate_currency_dimension(engine)
        return engine

    @staticmethod
    def populate_currency_dimension(engine):
        """
            Function here to read data from CSV into curr dimension on first run,
            Only for initial populate of data
            Passing engine instead of session because we don't need the session
            to read the data in from CSV"""

        # Thought about using the CSV library but would have needed to write way more code for this,
        # And without performance bench marks I did not see that value in that over using pandas.
        df = pd.read_csv('./data/currency.csv')
        s = Session(bind=engine)
        s.bulk_insert_mappings(ForexModels.Currency, df.to_dict(orient="records"))
        s.commit()
        s.close()

    @staticmethod
    def get_model_data(session, model_name):
        """
            :param model_name:
            :return: query_results
        """
        model = getattr(ForexModels, model_name)

        query_results = session.query(model)
        if query_results.count() == 0:
            logger.error("No results")
            session.close()
        else:
            session.close()
            return query_results.all()

    @staticmethod
    def get_model_data_engine(engine_uri, model_name):
        """
            :param model_name:
            :return: query_results
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
    def store_new_trade(session,
                        purchase_amount,
                        purchase_currency,
                        sale_amount,
                        sale_currency,
                        rate):
        """

        :param session:
        :param purchase_amount:
        :param purchase_currency:
        :param sale_amount:
        :param sale_currency:
        :return:
        """

        trade = ForexModels.Trade(rate=rate,
                                  purchase_amount=purchase_amount,
                                  sale_amount=sale_amount,
                                  purchase_currency_code=purchase_currency,
                                  sale_currency_code=sale_currency)

        session.add(trade)
        session.commit()
        session.close()
        return True

    @staticmethod
    def add_test_trade(engine_uri):
        engine = create_engine(engine_uri, echo=True)
        s = Session(bind=engine)
        DB_Utils.store_new_trade(session=s,
                                 purchase_amount=4444,
                                 purchase_currency="EUR",
                                 sale_amount=122,
                                 sale_currency="GBP",
                                 rate=1.2)
