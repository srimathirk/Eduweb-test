from faker import Faker
from models import User
from config import db, app, bcrypt

faker = Faker()

with app.app_context():

    print('Deleting User..')
    User.query.delete()
    print('Creating User..')
    

    for _ in range(10):
        username = faker.profile(fields=['username'])['username']
        user = User(
            username=username
        )

        user.password_hash = username #We calling password_hash setter method here
        db.session.add(user)
        db.session.commit()