from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

from config import db, bcrypt

# Define association table for many-to-many relationship between users and books
user_books = db.Table('user_books',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('book_id', db.Integer, db.ForeignKey('books.id'), primary_key=True)
)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String)
    is_admin = db.Column(db.Boolean, default=False)
    
    serialize_rules = ('-_password_hash','-books')

    books = db.relationship('Book', secondary= user_books)

    # def to_dict(self):
    #     return {
    #         'id': self.id,
    #         'username': self.username,
    #         # 'email': self.email,
    #         # Exclude password_hash from the dictionary
    #     }

    @hybrid_property #Restrict access to password hash
    def password_hash(self):
        raise Exception("Password hashes may not be viewed.")

    @password_hash.setter #Generate a Bcrypt password hash and set it to _password_hash attribute
    def password_hash(self, password):
        bcrypt_hash = bcrypt.generate_password_hash(password).decode("utf-8")
        self._password_hash = bcrypt_hash

    def authenticate(self, password): #check if provided password matches one that stored in db
        return bcrypt.check_password_hash(self._password_hash, password)

    def __repr__(self):
        return f"User {self.username}, ID: {self.id}"

class Book(db.Model, SerializerMixin):
    __tablename__ = 'books'

    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String) 
    title = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    pdf =  db.Column(db.String)
    views = db.Column(db.Integer, default=0)
    users = db.relationship('User', secondary=user_books, overlaps="books")
    reviews = db.relationship('Review', backref='books')
    ratings = db.relationship('Rating', backref='books')
    
    serialize_rules = ('-user_books','-ratings','-reviews')

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)
    serialize_rules = ('-user',)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'book_id': self.book_id,
            'content': self.content
         
        }
class Rating(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)
    serialize_rules = ('-user',)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'book_id': self.book_id,
            'value': self.value
         
        }