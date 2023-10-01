#!/usr/bin/env python3

from flask import request, session
from flask_restful import Resource

from config import app, db, api
from models import User, Book, user_books,Review, Rating

class ClearSession(Resource):

    def delete(self):
    
        session['page_views'] = None
        session['user_id'] = None

        return {}, 204

class Signup(Resource):
    
    def post(self):
        username = request.get_json()['username']
        # user = User.query.filter(User.username == username)

        password = request.get_json()['password']
        if username and password:
            user = User(
                username=username
            )
            user.password_hash = password

            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id
            return user.to_dict(), 201
        else:
            return {},204
    
        # return {'error': 'Invalid username or password'}, 401

        
class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        print(f"User ID from session: {user_id}")
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            print(f"User from database: {user}")
            if user:           
                return user.to_dict(), 200
        else:
            session.pop('user_id', None)
            return {}, 204


class Login(Resource):
    def post(self):
        
        username = request.get_json()['username']
        user = User.query.filter(User.username == username).first()
        password = request.get_json()['password']


        # users pwd is set by calling user.pawd = "new_pwd"
        # instead of pwd = user.pwd , here we authenticate by using bcrypt checking pwd = stored pwd hash
        if user and user.authenticate(password):
        
            session['user_id'] = user.id
            return user.to_dict(), 200

        return {}, 401
 

class Logout(Resource):
    def delete(self):

        # session['user_id'] = None
        session.pop ('user_id', None)
        return {}, 204


#RESTful route syntax
class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()] #Serialize users - password hashes shouldnot be sent to client  
        return users, 200


# class Books(Resource):
#     def get(self ):
#         # if session["user_id"]:
            
#         books = [book.to_dict() for book in Book.query.all()]
#         return (books, 200,)
# api.add_resource(Books, '/books')

def get_username_from_user_id(user_id):
    user = User.query.get(user_id)
    return user.username if user else None


class Books(Resource):
    def get(self ):
        # if session["user_id"]:
        if session['user_id']:
            books = Book.query.all()
            books_data = []

            for book in books:
                reviews_data = [{'content': review.content,  'username': get_username_from_user_id(review.user_id)} for review in book.reviews]
                books_data.append({
                    'id': book.id,
                    'Author': book.Author,
                    'Title': book.Title,
                    'Image': book.Image,
                    'pdf': book.pdf,
                    'reviews': reviews_data
                })

            return (books_data),200
        return {'message': 'Unauthorized'}, 401
class AddReview(Resource):
    def post(self):
        if 'user_id' not in session:
            return {'message': 'Unauthorized'}, 401

        user_id = session['user_id']
        book_id = request.get_json()['book_id']
        content = request.get_json()['content']

         # Create a new review associated with the specified user
        new_review = Review(user_id=user_id, book_id=book_id, content=content)
        db.session.add(new_review)
        db.session.commit()

        return jsonify({'message': 'Review added successfully'}), 201
            


api.add_resource(ClearSession, '/clear', endpoint='clear')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='checksession')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Users, '/users')
api.add_resource(Books, '/books')
api.add_resource(AddReview,'/add_review')

if __name__ == '__main__':
    app.run(port=5000, debug=True)
