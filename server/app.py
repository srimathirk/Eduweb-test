from flask import request, session
from flask_restful import Resource

from config import app, db, api # this line will run config.py and initialise our app
from models import User

#All routes herre

if __name__ == '__main__':
    app.run(port=5000,debug=True)