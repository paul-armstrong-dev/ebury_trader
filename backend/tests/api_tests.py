import unittest
from ..app import create_app
from ..api.forex_models import db


class ForexTraderApiTestCase(unittest.TestCase):
    """This class represents the forex trader API test cases"""

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = create_app(config_name="testing")
        self.client = self.app.test_client
        self.test_record = {
            "buy": "AUD",
            "sell": "HKD",
            "rate": 0.1882346143,
            "amount": "12313",
            "result": 2317.7328058759
        }
        # binds the app to the current context
        with self.app.app_context():
            # create all tables
            db.create_all()

    def test_trade_creation(self):
        """Test API can create a trade list (POST request)"""
        res = self.client().post('/trades/', data=self.test_record)
        self.assertEqual(res.status_code, 201)
        self.assertIn('AUD', str(res.data))

    def test_api_can_get_all_trades(self):
        """Test API can get a trade list (GET request)."""
        res = self.client().post('/trades/', data=self.test_record)
        self.assertEqual(res.status_code, 201)
        res = self.client().get('/trades/')
        self.assertEqual(res.status_code, 200)
        self.assertIn('AUD', str(res.data))

    def tearDown(self):
        """teardown all initialized variables."""
        with self.app.app_context():
            # drop all tables
            db.session.remove()
            db.drop_all()


# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()
