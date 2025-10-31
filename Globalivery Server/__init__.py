from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import API

db = SQLAlchemy()
api = API()

def create_app(test_config=None):
    app = Flask(__name__,instance_relative_config = True)
    app.config['SECRET_KEY'] = 'your_secret_key'
    
    db.init_app(app)
    api.init_app(app)

    if test_config is None:
        app.config.from_pyfile("config.py")

