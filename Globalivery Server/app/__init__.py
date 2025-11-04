from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api

from . import config

db = SQLAlchemy()
api = Api()

def create_app(test_config=None):
    app = Flask(__name__)
    app.config["SQLALCEMY_DATABASE_URI"] = "sqlite://database.db"

    if test_config is None:
        app.config.from_pyfile(config)

    db.init_app(app)
    api.init_app(app)

    return app
