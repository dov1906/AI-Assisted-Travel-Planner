import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function NavBar() {
    const [currentTripId, setCurrentTripId] = useState(null);
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all trips from the backend
        fetch("http://127.0.0.1:5555/trips")
            .then((response) => response.json())
            .then((data) => setTrips(data))
            .catch((error) => console.error("Error fetching trips:", error));
    }, []);

    const handleTripSelection = (id) => {
        setCurrentTripId(id);
        navigate(`/trip/${id}/expenses`);
    };

    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/trips">My Trips</NavLink>
            <NavLink to={`/trip/${currentTripId || "default"}`}>Trip Details</NavLink>
            <NavLink to={`/trip/${currentTripId || "default"}/activities`}>Activity Planner</NavLink>
            <NavLink to={`/trip/${currentTripId || "default"}/add-activity`}>Add Activity</NavLink>
            <NavLink to={`/trip/${currentTripId || "default"}/expenses`}>Expenses</NavLink>
            <NavLink to="/browse-prices">Browse Prices</NavLink>
            <NavLink to="/profile">Profile</NavLink>

            {/* Dropdown to select a trip */}
            <div>
                <label htmlFor="trip-select">Select Trip:</label>
                <select
                    id="trip-select"
                    value={currentTripId || ""}
                    onChange={(e) => handleTripSelection(e.target.value)}
                >
                    <option value="">--Select a Trip--</option>
                    {trips.map((trip) => (
                        <option key={trip.id} value={trip.id}>
                            {trip.name}
                        </option>
                    ))}
                </select>
            </div>
        </nav>
    );
}

export default NavBar;
