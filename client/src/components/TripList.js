import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function TripList() {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5555/trips")
            .then((response) => response.json())
            .then((data) => setTrips(data))
            .catch((error) => console.error("Error fetching trips:", error));
    }, []);

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>My Trips</h1>
            <p>Explore all your trips and view their details.</p>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "20px",
                }}
            >
                {trips.map((trip) => (
                    <div
                        key={trip.id}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            padding: "15px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            backgroundColor: "#fff",
                        }}
                    >
                        <h2 style={{ margin: "0 0 10px 0", fontSize: "22px", color: "#333" }}>
                            {trip.name}
                        </h2>
                        <p style={{ margin: "5px 0", color: "#666" }}>
                            <strong>Destination:</strong> {trip.destination}
                        </p>
                        <p style={{ margin: "5px 0", color: "#666" }}>
                            <strong>Dates:</strong> {trip.start_date} - {trip.end_date}
                        </p>
                        <p style={{ margin: "5px 0", color: "#666" }}>
                            <strong>Total Expense:</strong> ${trip.total_expense || "N/A"}
                        </p>
                        <NavLink
                            to={`/trip/${trip.id}`}
                            style={{
                                textDecoration: "none",
                                color: "#007BFF",
                                fontWeight: "bold",
                                marginTop: "10px",
                                display: "inline-block",
                            }}
                        >
                            View Details
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TripList;
