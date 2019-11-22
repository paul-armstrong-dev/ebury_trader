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

    # Surprisingly important piece of config, flasks jsonify sorts by default,
    # I don't want this
    # Table structure sets the output report structure here so if this is removed the columns and
    # Rows in output won't match
    JSON_SORT_KEYS = False