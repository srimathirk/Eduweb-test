from flask import flask
from flask_brypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

app=Flask(__name__)
app.secret_key = 'YOUR_APP_SECRET_HERE'  # in terminal run, python -c 'import os; print(os.urandom(16))'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

db = SQLAlchemy()
migrate = Migrate(app,db)
db.init_app(app)

bcrypt = Bcrypt(app)

api = Api(app)