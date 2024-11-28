#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, request, jsonify
from flask_restful import Resource
import requests
# Local imports,
from config import app, db, api, FLIGHT_API_KEY

# Add your model imports
from models import User, Trip, Activity, Expense, ExpenseUser
from services.flight_api import get_flight_prices
from datetime import datetime
# Views go here!

from dotenv import load_dotenv
import os
import openai

# Load environment variables from .env
load_dotenv()

# Get the API key from the environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")

MAKCORPS_API_KEY = "674661a07d3a82d995227011"  
MAKCORPS_BASE_URL = "https://api.makcorps.com"

# User Routes
class Signup(Resource):
    def post(self):
        name = request.json.get('name')
        email = request.json.get('email')
        password = request.json.get('password')
        try:
            new_user = User(name=name, email=email, password=password)
            db.session.add(new_user)
            db.session.commit()
            response_body = new_user.to_dict(only=('id', 'name', 'email'))
            return make_response(response_body, 201)
        except:
            response_body = {"error": "Invalid user data provided!"}
            return make_response(response_body, 422)

api.add_resource(Signup, '/signup')

class Login(Resource):
    def post(self):
        email = request.json.get('email')
        password = request.json.get('password')
        user = User.query.filter_by(email=email, password=password).first()
        if user:
            response_body = user.to_dict(only=('id', 'name', 'email'))
            return make_response(response_body, 200)
        else:
            response_body = {"error": "Invalid email or password!"}
            return make_response(response_body, 401)

api.add_resource(Login, '/login')

# Trip Routes
class AllTrips(Resource):


    def get(self):
        trips = Trip.query.all()
        response_body = [
            {**trip.to_dict(only=('id', 'name', 'destination', 'start_date', 'end_date')), 
             "total_expense": trip.total_expense}  # Include total_expense
            for trip in trips
        ]
        return make_response(response_body, 200)

    def post(self):
        name = request.json.get('name')
        destination = request.json.get('destination')
        start_date = request.json.get('start_date')
        end_date = request.json.get('end_date')
        user_id = request.json.get('user_id')
        try:
            new_trip = Trip(name=name, destination=destination, start_date=start_date, end_date=end_date, user_id=user_id)
            db.session.add(new_trip)
            db.session.commit()
            response_body = new_trip.to_dict(only=('id', 'name', 'destination', 'start_date', 'end_date'))
            return make_response(response_body, 201)
        except:
            response_body = {"error": "Invalid trip data provided!"}
            return make_response(response_body, 422)

api.add_resource(AllTrips, '/trips')

class TripByID(Resource):
    def get(self, id):
        trip = db.session.get(Trip, id)
        if trip:
            response_body = trip.to_dict(only=(
                'id', 'name', 'destination', 'start_date', 'end_date',
                'activities.id', 'activities.name', 'activities.description',
                'expenses.id', 'expenses.amount', 'expenses.description',
            ))
            response_body["total_expense"] = trip.total_expense  # Add total_expense
            return make_response(jsonify(response_body), 200)
        else:
            return make_response({"error": "Trip not found!"}, 404)
    def put(self, id):
        trip = db.session.get(Trip, id)
        if trip:
            try:
                allowed_fields = ['name', 'destination', 'start_date', 'end_date']
                for attr, value in request.json.items():
                    if attr in allowed_fields:
                        # Convert date strings to date objects
                        if attr in ['start_date', 'end_date'] and isinstance(value, str):
                            value = datetime.strptime(value, "%Y-%m-%d").date()
                        setattr(trip, attr, value)

                db.session.commit()
                response_body = trip.to_dict(only=('id', 'name', 'destination', 'start_date', 'end_date', 'total_expense'))
                return make_response(response_body, 200)
            except Exception as e:
                print(f"Error processing PATCH request: {e}")
                response_body = {"error": "Invalid trip data provided!"}
                return make_response(response_body, 422)
        else:
            response_body = {"error": "Trip not found!"}
            return make_response(response_body, 404)

    def patch(self, id):
        trip = db.session.get(Trip, id)
        if trip:
            try:
                allowed_fields = ['name', 'destination', 'start_date', 'end_date']
                for attr, value in request.json.items():
                    if attr in allowed_fields:
                        # Convert date strings to Python date objects
                        if attr in ['start_date', 'end_date'] and isinstance(value, str):
                            value = datetime.strptime(value, "%Y-%m-%d").date()
                        setattr(trip, attr, value)
                db.session.commit()
                response_body = trip.to_dict(only=('id', 'name', 'destination', 'start_date', 'end_date'))
                return make_response(response_body, 200)
            except Exception as e:
                response_body = {"error": f"Invalid trip data provided: {e}"}
                return make_response(response_body, 422)
        else:
            response_body = {"error": "Trip not found!"}
            return make_response(response_body, 404)

    def delete(self, id):
        trip = db.session.get(Trip, id)
        if trip:
            db.session.delete(trip)
            db.session.commit()
            return make_response({}, 204)
        else:
            response_body = {"error": "Trip not found!"}
            return make_response(response_body, 404)

api.add_resource(TripByID, '/trips/<int:id>')


# Activity Routes
class TripActivities(Resource):
    def get(self, trip_id):
        activities = Activity.query.filter_by(trip_id=trip_id).all()
        response_body = [activity.to_dict(only=('id', 'name', 'description', 'location', 'time')) for activity in activities]
        return make_response(response_body, 200)

    def post(self, trip_id):
        name = request.json.get('name')
        description = request.json.get('description')
        location = request.json.get('location')
        try:
            new_activity = Activity(
                name=name,
                description=description,
                location=location,
                trip_id=trip_id
            )
            db.session.add(new_activity)
            db.session.commit()
            response_body = new_activity.to_dict(only=('id', 'name', 'description', 'location'))
            return make_response(response_body, 201)
        except Exception as e:
            print(f"Error adding activity: {e}")
            response_body = {"error": str(e)}
            return make_response(response_body, 422)

api.add_resource(TripActivities, '/trips/<int:trip_id>/activities')

class ActivityByID(Resource):
    def put(self, id):
        activity = Activity.query.get(id)
        if activity:
            try:
                for attr in request.json:
                    setattr(activity, attr, request.json.get(attr))
                db.session.commit()
                response_body = activity.to_dict(only=('id', 'name', 'description', 'location', 'time'))
                return make_response(response_body, 200)
            except:
                response_body = {"error": "Invalid activity data provided!"}
                return make_response(response_body, 422)
        else:
            response_body = {"error": "Activity not found!"}
            return make_response(response_body, 404)

    def delete(self, id):
        activity = Activity.query.get(id)
        if activity:
            db.session.delete(activity)
            db.session.commit()
            return make_response({}, 204)
        else:
            response_body = {"error": "Activity not found!"}
            return make_response(response_body, 404)

api.add_resource(ActivityByID, '/activities/<int:id>')

# Expense Routes
class TripExpenses(Resource):
    def get(self, trip_id):
        expenses = Expense.query.filter_by(trip_id=trip_id).all()
        response_body = [expense.to_dict(only=('id', 'amount', 'description')) for expense in expenses]
        return make_response(response_body, 200)

    def post(self, trip_id):
        amount = request.json.get('amount')
        description = request.json.get('description')
        try:
            new_expense = Expense(amount=amount, description=description, trip_id=trip_id)
            db.session.add(new_expense)
            db.session.commit()
            response_body = new_expense.to_dict(only=('id', 'amount', 'description'))
            return make_response(response_body, 201)
        except Exception as e:
            print(f"Error adding expense for trip {trip_id}: {e}")
            response_body = {"error": str(e)}
            return make_response(response_body, 422)


api.add_resource(TripExpenses, '/trips/<int:trip_id>/expenses')


# User Profile Routes
class UserProfile(Resource):
    def get(self):
        # Replace this with the actual user fetching logic
        # Assuming the user is authenticated and their ID is available (e.g., session or token-based authentication)
        user_id = 1  # Example user ID
        user = User.query.get(user_id)
        if user:
            response_body = user.to_dict(only=('id', 'name', 'email'))
            return make_response(response_body, 200)
        else:
            return make_response({"error": "User not found"}, 404)

    def put(self):
        user_id = 1  # Example user ID
        user = User.query.get(user_id)
        if user:
            try:
                user.name = request.json.get('name', user.name)
                user.email = request.json.get('email', user.email)
                password = request.json.get('password', None)
                if password:
                    user.password = password  # Make sure to hash the password before storing it
                db.session.commit()
                response_body = user.to_dict(only=('id', 'name', 'email'))
                return make_response(response_body, 200)
            except Exception as e:
                return make_response({"error": "Failed to update user profile"}, 400)
        else:
            return make_response({"error": "User not found"}, 404)

api.add_resource(UserProfile, '/user')


class ExpenseByID(Resource):
    def put(self, id):
        expense = Expense.query.get(id)
        if expense:
            try:
                for attr in request.json:
                    setattr(expense, attr, request.json.get(attr))
                db.session.commit()
                response_body = expense.to_dict(only=('id', 'amount', 'description'))
                return make_response(response_body, 200)
            except:
                response_body = {"error": "Invalid expense data provided!"}
                return make_response(response_body, 422)
        else:
            response_body = {"error": "Expense not found!"}
            return make_response(response_body, 404)

    def delete(self, id):
        expense = Expense.query.get(id)
        if expense:
            db.session.delete(expense)
            db.session.commit()
            return make_response({}, 204)
        else:
            response_body = {"error": "Expense not found!"}
            return make_response(response_body, 404)

api.add_resource(ExpenseByID, '/expenses/<int:id>')

@app.route('/api/generate_itinerary', methods=['POST'])
def generate_itinerary_route():
    # data = request.json
    # destination = data.get("destination")
    # duration = data.get("duration")
    # interests = data.get("interests")
    
    itinerary = generate_itinerary()
    if itinerary:
        return jsonify({"itinerary": itinerary}), 200
    else:
        return jsonify({"error": "Failed to generate itinerary"}), 500


@app.route('/api/roundtrip', methods=['GET'])
def roundtrip():
    # Get query parameters
    departure_airport_code = request.args.get("departure_airport_code")
    arrival_airport_code = request.args.get("arrival_airport_code")
    departure_date = request.args.get("departure_date")
    arrival_date = request.args.get("arrival_date")
    number_of_adults = request.args.get("number_of_adults", 1)
    number_of_childrens = request.args.get("number_of_childrens", 0)
    number_of_infants = request.args.get("number_of_infants", 0)
    cabin_class = request.args.get("cabin_class", "Economy")
    currency = request.args.get("currency", "USD")
    region = request.args.get("region", "US")

    # Validate required parameters
    if not departure_airport_code or not arrival_airport_code or not departure_date or not arrival_date:
        return jsonify({"error": "Missing required query parameters"}), 400

    try:
        # Fetch data using the get_flight_prices function
        flight_data = get_flight_prices(
            departure_airport_code, 
            arrival_airport_code, 
            departure_date, 
            arrival_date, 
            number_of_adults, 
            number_of_childrens, 
            number_of_infants, 
            cabin_class, 
            currency, 
            region
        )

        # if not flight_data:
        #     return jsonify({"error": "Unable to fetch flight data"}), 500

        # Simplify the response
        simplified_data = []
        itineraries = flight_data.get("itineraries", [])
        legs = {leg["id"]: leg for leg in flight_data.get("legs", [])}
        segments = {segment["id"]: segment for segment in flight_data.get("segments", [])}

        for itinerary in itineraries[:10]:  # Limit to 10 results
            pricing_option = itinerary.get("pricing_options", [{}])[0]
            price_info = pricing_option.get("price", {})
            leg_ids = itinerary.get("leg_ids", [])

            for leg_id in leg_ids:
                leg = legs.get(leg_id, {})

                # Collect segment-level details (optional)
                flight_numbers = []
                operating_carriers = []
                modes = []

                for segment_id in leg.get("segment_ids", []):
                    segment = segments.get(segment_id, {})
                    flight_numbers.append(segment.get("marketing_flight_number"))
                    operating_carriers.append(segment.get("operating_carrier_id"))
                    modes.append(segment.get("mode"))

                # Add the leg to the simplified data, avoiding duplication
                simplified_data.append({
                    "price": price_info.get("amount"),
                    "currency": price_info.get("currency"),
                    "departure": leg.get("departure"),
                    "arrival": leg.get("arrival"),
                    "duration_minutes": leg.get("duration"),
                    "stops": leg.get("stop_count"),
                    "flight_numbers": flight_numbers,  # Include all segment flight numbers
                    "operating_carrier_ids": operating_carriers,  # Include all carrier IDs
                    "modes": modes  # Include all transport modes
                })

        # Return the simplified data
        return jsonify(simplified_data), 200

    except requests.exceptions.RequestException as e:
        print("Error fetching flight data:", e)
        return jsonify({"error": "Unable to fetch flight data"}), 500
    except KeyError as e:
        print("Missing key in response:", e)
        return jsonify({"error": "Unexpected API response format"}), 500
    

@app.route('/generate-itinerary', methods=['GET'])
def generate_itinerary():
    
    destination = request.args.get("destination", "Paris")
    duration = request.args.get("duration", 1)
    interests = request.args.get("interests", "art museums")

    try:
        # Call OpenAI API with minimal token usage
        response = openai.ChatCompletion.create(
            model="gpt-4",  # Or gpt-3.5-turbo
            messages=[
                {"role": "system", "content": "You are a travel assistant."},
                {"role": "user", "content": (
                    f"Generate a {duration}-day itinerary for {destination} focusing on {interests}. Answer by doing a list of activities. Only this "
                )}
            ],
            max_tokens=500,
            temperature=0.7
        )

        # Extract the AI-generated content
        itinerary = response.choices[0].message['content']
        return jsonify({"itinerary": itinerary}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
@app.route('/')
def index():
    return '<h1>Travel Planner Server</h1>'

if __name__ == '__main__':
    app.run(port=5555, debug=True)
