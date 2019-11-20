from sqlalchemy import create_engine
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from sqlalchemy.orm.exc import NoResultFound
from loguru import logger
import pandas as pd
from .forex_models import ForexModels


class DB_Utils:
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
        DB_Utils.populate_currency_dimension(engine)
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
    sale = ForexModels.Sale(amount=sale_amount)
    sale.currency = DB_Utils.get_or_create(session=session,
                                           model=ForexModels.Currency,
                                           code=sale_currency)

    purchase = ForexModels.Purchase(amount=purchase_amount)
    purchase.currency = DB_Utils.get_or_create(session=session,
                                               model=ForexModels.Currency,
                                               code=purchase_currency)

    trade = ForexModels.Trade(rate=rate, purchase=purchase, sale=sale)

    session.add(trade)
    session.commit()
    session.close()
    return True



#engine = DB_Utils.recreate_db()
#populate_currency_dimension(engine)
#engine = create_engine('sqlite:///db/school.db')
#s = Session(bind=engine)

#store_new_trade(session=s,
#                purchase_amount=4444,
#                purchase_currency="EUR",
#                sale_amount=122,
#                sale_currency="GBP",
#                rate=1.2)

#data = get_model_data(s, "Trade")

#for d in data:
#    print(d.trade_id)
#    print(d.purchase.currency.code)
#    print(d.sale.currency.code)
#    print(d.purchase.amount)
#    print(d.sale.amount)



#sale = ForexModels.Sale(amount=10)
#purchase = ForexModels.Purchase(amount=1)
#trade = ForexModels.Trade()

"""


sale = ForexModels.Sale(amount=10)


purchase = ForexModels.Purchase(amount=15)
purchase.currency = DB_Utils.get_or_create(session=s, model=ForexModels.Currency, code="EUR")

trade = ForexModels.Trade(rate=1.2, purchase=purchase, sale=sale)

s.add(trade)
s.commit()
s.close()
"""




# t1 = Trade(sale_amount=10, buy_amount=5, rate=15)
# t1.currency.append(c)
# t2 = Trade()



# s.bulk_insert_mappings(Currency, df.to_dict(orient="records"))

