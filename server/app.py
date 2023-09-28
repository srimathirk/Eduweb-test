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
class Login(Resource):
    def post(self):
        
        username = request.get_json()['username']
        user = User.query.filter(User.username == username).first()
        password = request.get_json()['password']

        # if user:
        # users pwd is set by calling user.pawd = "new_pwd"
        # instead of pwd = user.pwd , here we authenticate by using bcrypt checking pwd = stored pwd hash
        if user.authenticate(password):
        
            session['user_id'] = user.id
            return user.to_dict(), 200

        return {"errors": ["Username or password incorrect"]},401   
        # else:
        #     return {"errors": ["Username or password incorrect"]},401    

class Logout(Resource):
    def delete(self):

        session['user_id'] = None
        
        return {}, 204

#RESTful route syntax
class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()] #Serialize users - password hashes shouldnot be sent to client  
        return users, 200
api.add_resource(Users, '/users')


api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')


# class Books(Resource):
#     def get(self ):
#         # if session["user_id"]:
            
#         books = [book.to_dict() for book in Book.query.all()]
#         return make_response(jsonify(books), 200,)


# api.add_resource(Books, '/books')
if __name__ == '__main__':
    app.run(port=5000,debug=True)