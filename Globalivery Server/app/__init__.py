from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api

from . import config
from api.appresource import UserResource,ProductResource,CategoryResource, OrderResource

db = SQLAlchemy()
api = Api()

def create_app(test_config=None):
    app = Flask(__name__)
    app.config["SQLALCEMY_DATABASE_URI"] = "sqlite://database.db"

    if test_config is None:
        app.config.from_pyfile(config)

    db.init_app(app)
    api.init_app(app)

    api.add_resource(CategoryResource,"/categories")
    api.add_resource(ProductResource,"/products")
    api.add_resource(UserResource,"/users")
    api.add_resource(OrderResource,"orders/")

    return app