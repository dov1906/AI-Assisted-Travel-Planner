
# AI-Assisted Travel Planner


## Introduction

The AI-Assisted Travel Planner is a full-stack application designed to simplify travel planning. Users can create trips, manage activities and expenses, and receive AI-generated itineraries. The platform leverages APIs for real-time data integration, providing a seamless and dynamic user experience.

---

## Setup

### `server/`

The `server/` directory contains the backend logic built with Flask. It includes the following key components:

- **`app.py`**: The Flask application and API routes.
- **`models.py`**: SQLAlchemy models for the database.
- **`seed.py`**: Script to seed the database with initial data.
- **`config.py`**: Flask configuration file.

To set up the backend, run:

```console
pipenv install
pipenv shell
python server/app.py
```

### `client/`

The `client/` directory contains the frontend logic built with React. The key files include:

- **`src/components/`**: React components for user interaction and UI rendering.
- **`src/App.js`**: Main entry point for the React application.

To set up the frontend, run:

```console
npm install --prefix client
npm start --prefix client
```

---

## Key Features

1. **Trip Management**:
   - Create, read, update, and delete trips with associated activities and expenses.
   - Track total expenses dynamically.

2. **API Integrations**:
   - **MakCorps API**: For hotel price comparisons.
   - **Flight API**: For real-time flight search.
   - **OpenAI API**: For generating personalized travel itineraries.

3. **Interactive UI**:
   - Dynamic updates using React hooks (`useState`, `useEffect`).
   - Real-time CRUD operations for activities and expenses.

---

## Directory Structure

```console
.
├── client
│   ├── src
│   │   ├── components
│   │   │   ├── TripDetails.js
│   │   │   ├── TripList.js
│   │   │   └── ActivityForm.js
│   └── package.json
├── server
│   ├── app.py
│   ├── config.py
│   ├── models.py
│   ├── seed.py
│   └── migrations
├── README.txt
└── requirements.txt
```

---

## How It Works

1. **User Interaction**:
   - Navigate through trips and view detailed itineraries.
   - Manage activities and expenses within each trip.

2. **Backend Logic**:
   - Flask handles API requests, communicates with the database, and processes data.

3. **Frontend Rendering**:
   - React ensures a responsive and dynamic UI for user interactions.

---

## Future Improvements

- Add user authentication and personalized dashboards.
- Enable collaborative trip planning for multiple users.
- Expand API integrations for enhanced travel data.

---

## Resources

- [Flask Documentation](https://flask.palletsprojects.com/en/2.1.x/)
- [React Documentation](https://reactjs.org/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [OpenAI API](https://platform.openai.com/)
- [MakCorps API](https://makcorps.com/)

---


