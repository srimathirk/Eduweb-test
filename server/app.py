from flask import request, session
from flask_restful import Resource

from config import app, db, api # this line will run config.py and initialise our app
from models import User

#All routes herre
@app.route("/", methods=["GET"])
def root():
    return "<h1>Welcome to educa Web Testing App!</h1>"

#RESTful route syntax
class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()] #Serialize users - password hashes shouldnot be sent to client  
        return users, 200
api.add_resource(Users, '/users')

if __name__ == '__main__':
    app.run(port=5000,debug=True)