from faker import Faker
from models import User
from config import db, app, bcrypt

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