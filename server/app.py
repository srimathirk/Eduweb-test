from flask import request, session
from flask_restful import Resource

from config import app, db, api # this line will run config.py and initialise our app
from models import User

#All routes herre
@app.route("/", methods=["GET"])
def root():
    return "<h1>Welcome to educa Web Testing App!</h1>"

class Signup(Resource):
    
    def post(self):
        username = request.get_json()['username']
        # user = User.query.filter(User.username == username)

        password = request.get_json()['password']
        if username and password:
            new_user = User(
                username=username
            )
            new_user.password_hash = password

            db.session.add(new_user)
            db.session.commit()

            session['user_id'] = new_user.id
            return new_user.to_dict(), 201
        else:
            return {'error': 'Invalid username or password'}, 422
    
        # return {'error': 'Invalid username or password'}, 401



#RESTful route syntax
class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()] #Serialize users - password hashes shouldnot be sent to client  
        return users, 200
api.add_resource(Users, '/users')




if __name__ == '__main__':
    app.run(port=5000,debug=True)