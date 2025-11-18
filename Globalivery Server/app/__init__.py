from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api
from flask_socketio import SocketIO,emit
from flask_marshmallow import Marshmallow

from .config import Config
from .api.appresource import CategoryResource, ProductResource, UserResource, OrderResource
from .models import db
from .schema import marshmallow


api = Api()
migrate = Migrate()


def create_app(config_class=Config):
    app= Flask(__name__)
    socketio = SocketIO(app, cors_allowed_origins="*")
    app.config.from_object(config_class)
    CORS(app)

    db.init_app(app)
    migrate.init_app(app, db)
    marshmallow.init_app(app)
    api.init_app(app)

    api.add_resource(UserResource, '/users', '/users/<int:user_id>')
    api.add_resource(ProductResource, '/products', '/products/<int:product_id>')
    api.add_resource(CategoryResource, '/categories', '/categories/<int:category_id>')
    api.add_resource(OrderResource, '/orders', '/orders/<int:order_id>')

    return app