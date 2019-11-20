import os 

class Config(object):
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = f"mysql+mysqlconnector" \
                              f"://{os.environ.get('MYSQL_USER')}" \
                              f":{os.environ.get('MYSQL_PASSWORD')}" \
                              f"@download_manager_db" \
                              f":{os.environ.get('MYSQL_PORT')}" \
                              f"/{os.environ.get('MYSQL_DATABASE')}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False