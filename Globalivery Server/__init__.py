from flask import Flask

def create_app(test_config=None):
    app = Flask(__name__,instance_relative_config = True)
    app.config['SECRET_KEY'] = 'your_secret_key'
    

    if test_config is None:
        app.config.from_pyfile("config.py")

