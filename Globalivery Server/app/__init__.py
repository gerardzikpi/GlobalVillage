from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api
from flask_marshmallow import Marshmallow

from .config import Config
from .api.appresource import CategoryResource, ProductResource, UserResource, OrderResource


api = Api()
db = SQLAlchemy()
migrate = Migrate()
ma = Marshmallow()

def create_app(config_class=Config):
    app= Flask(__name__)
    app.config.from_object(config_class)
    CORS(app)

    db.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)
    api.init_app(app)

    api.add_resource(UserResource, '/users', '/users/<int:user_id>')
    api.add_resource(ProductResource, '/products', '/products/<int:product_id>')
    api.add_resource(CategoryResource, '/categories', '/categories/<int:category_id>')
    api.add_resource(OrderResource, '/orders', '/orders/<int:order_id>')

    return app