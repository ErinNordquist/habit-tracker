from flask import Flask
from config import Config


def create_app(test_config=None):
    app = Flask(__name__)
    app.config.from_object(Config)

    #if test_config is not None:



    from habit_app.database import init_db, init_app
    with app.app_context():
        #db = init_db()
        init_app(app)

    from . import auth, routes
    app.register_blueprint(routes.bp)
    app.register_blueprint(auth.bp)


    #from habit_app import routes
    return app

app = create_app()