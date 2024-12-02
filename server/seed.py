#!/usr/bin/env python3

# Standard library imports
from random import randint, choice, uniform
from datetime import date, datetime, timedelta

# Local imports
from app import app
from models import db, User, Trip, Activity, Expense

if __name__ == '__main__':
    with app.app_context():
        print("🌱 Starting seed... 🌱")

        # Clear existing data
        User.query.delete()
        Trip.query.delete()
        Activity.query.delete()
        Expense.query.delete()

        # Create Users
        users = [
            User(name="Alice Johnson", email="alice@example.com", password="password123"),
            User(name="Bob Smith", email="bob@example.com", password="securepassword"),
            User(name="Charlie Brown", email="charlie@example.com", password="charliepassword"),
            User(name="Diana Prince", email="diana@example.com", password="wonderwoman123"),
        ]

        # Commit users to the database
        db.session.add_all(users)
        db.session.commit()

        # Create Trips
        trips = [
            Trip(
                name="Hawaiian Adventure",
                destination="Hawaii, USA",
                start_date=date(2024, 12, 1),
                end_date=date(2024, 12, 10),
                user_id=users[0].id,
            ),
            Trip(
                name="Paris Getaway",
                destination="Paris, France",
                start_date=date(2024, 12, 15),
                end_date=date(2024, 12, 20),
                user_id=users[1].id,
            ),
            Trip(
                name="Tokyo Exploration",
                destination="Tokyo, Japan",
                start_date=date(2024, 11, 25),
                end_date=date(2024, 12, 5),
                user_id=users[2].id,
            ),
            Trip(
                name="Sydney Adventure",
                destination="Sydney, Australia",
                start_date=date(2025, 1, 5),
                end_date=date(2025, 1, 15),
                user_id=users[3].id,
            ),
        ]

        # Commit trips to the database
        db.session.add_all(trips)
        db.session.commit()

        # Generate Activities
        activities = [
            Activity(
                name="Snorkeling",
                description="Explore the coral reefs",
                location="Maui Beach",

                trip_id=trips[0].id,
            ),
            Activity(
                name="Hiking",
                description="Enjoy breathtaking views of the mountains",
                location="Haleakalā National Park",

                trip_id=trips[0].id,
            ),
            Activity(
                name="Wine Tasting",
                description="Enjoy the finest wines",
                location="Chateau de France",

                trip_id=trips[1].id,
            ),
            Activity(
                name="Museum Visit",
                description="Explore the history and culture of Paris",
                location="Louvre Museum",

                trip_id=trips[1].id,
            ),
            Activity(
                name="Sushi Making Class",
                description="Learn to make authentic Japanese sushi",
                location="Tokyo Culinary School",
           
                trip_id=trips[2].id,
            ),
            Activity(
                name="City Night Tour",
                description="Experience Tokyo at night",
                location="Shinjuku District",
            
                trip_id=trips[2].id,
            ),
            Activity(
                name="Opera House Visit",
                description="Discover the beauty of the Sydney Opera House",
                location="Sydney Opera House",
            
                trip_id=trips[3].id,
            ),
            Activity(
                name="Surfing Lesson",
                description="Catch the waves at Bondi Beach",
                location="Bondi Beach",
     
                trip_id=trips[3].id,
            ),
        ]

        # Commit activities to the database
        db.session.add_all(activities)
        db.session.commit()

        # Generate Expenses
        expenses = [
            Expense(amount=150.00, description="Snorkeling gear rental", trip_id=trips[0].id),
            Expense(amount=80.00, description="National Park entrance fee", trip_id=trips[0].id),
            Expense(amount=300.00, description="Wine tasting tour", trip_id=trips[1].id),
            Expense(amount=50.00, description="Museum tickets", trip_id=trips[1].id),
            Expense(amount=100.00, description="Sushi class fee", trip_id=trips[2].id),
            Expense(amount=70.00, description="Night tour guide", trip_id=trips[2].id),
            Expense(amount=200.00, description="Opera House guided tour", trip_id=trips[3].id),
            Expense(amount=120.00, description="Surfing lesson", trip_id=trips[3].id),
        ]

        # Commit expenses to the database
        db.session.add_all(expenses)
        db.session.commit()

        print("🌱 Users, Trips, Activities, and Expenses successfully seeded! 🌱")
