from faker import Faker
from models import User, Book, Review, Rating
from config import db, app, bcrypt
import random
faker = Faker()

with app.app_context():

    print('Deleting User..')
    User.query.delete()
    print('Creating User..')
    # make sure users have unique usernames
    users = []
    usernames = []


    for _ in range(10):
        username = faker.first_name()
        while username in usernames:
            username = faker.first_name()
        usernames.append(username)
        user = User(
            username=username
        )

        user.password_hash = user.username + 'password' #We calling password_hash setter method here
        db.session.add(user)
        db.session.commit()

    books = []

    book1=Book(
        Author="Allyn Fischer",
        Title="How Does A Pumpkin Grow",
        Image="./photos/How-Does-A-Pumpkin-Grow.png",
        pdf="./pdf/How-Does-A-Pumpkin-Grow.pdf",
    )
    books.append(book1)

    book2=Book(
        Author="Bel Richardson",
        Title="Kittens!",
        Image="./photos/Kittens.png",
        pdf="./pdf/Kittens.pdf",
    )
    books.append(book2)

    book3=Book(
        Author="Kahani Goyal",
        Title="The Cute And Cuddly Koalas",
        Image="./photos/The-Cute-And-Cuddly-Koalas.png",
        pdf="./pdf/The-Cute-And-Cuddly-Koalas.pdf",
    )
    books.append(book3)

    book4=Book(
        Author="Ivan Parvov",
        Title="The Green Chicken",
        Image="./photos/The-Green-Chicken.png",
        pdf="./pdf/The-Green-Chicken.pdf",
    )
    books.append(book4)

    book5=Book(
        Author="Computer mice",
        Title="The Good Fox",
        Image="./photos/The-Good-Fox.png",
        pdf="./pdf/The-Good-Fox.pdf",
    )
    books.append(book5)

    db.session.add_all(books)
    db.session.commit()
    
    ratings=[]
    # user = User.query.get(users.id)
    # book = Book.query.get(books.id)
    rating1=Rating(value=5, user_id=8, book_id=5)
    ratings.append(rating1)
    rating3=Rating(value=3, user_id=5, book_id=2)
    ratings.append(rating3)
    rating2=Rating(value=4, user_id=3, book_id=1)
    ratings.append(rating2)
    db.session.add_all(ratings)
    db.session.commit()

    reviews=[]
    review1=Review(content="An excellent book", user_id=5, book_id=5)
    reviews.append(review1)
    review3=Review(content="Highly Recommended", user_id=9, book_id=3)
    reviews.append(review3)
    review2=Review(content="Nice one!", user_id=6, book_id=4)
    reviews.append(review2)
    db.session.add_all(reviews)
    db.session.commit()
