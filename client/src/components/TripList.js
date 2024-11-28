import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function TripList() {
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = () => {
        fetch("http://127.0.0.1:5555/trips")
            .then((response) => response.json())
            .then((data) => setTrips(data))
            .catch((error) => console.error("Error fetching trips:", error));
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this trip?")) {
            fetch(`http://127.0.0.1:5555/trips/${id}`, {
                method: "DELETE",
            })
                .then((response) => {
                    if (response.ok) {
                        alert("Trip deleted successfully.");
                        fetchTrips(); // Refresh the trip list
                    } else {
                        alert("Failed to delete the trip.");
                    }
                })
                .catch((error) => console.error("Error deleting trip:", error));
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>My Trips</h1>
            <p>Explore all your trips and view their details.</p>
            <button
                onClick={() => navigate("/add-trip")}
                style={{
                    padding: "10px 20px",
                    marginBottom: "20px",
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Add New Trip
            </button>
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
                        <div style={{ marginTop: "10px" }}>
                            <NavLink
                                to={`/trip/${trip.id}`}
                                style={{
                                    textDecoration: "none",
                                    color: "#007BFF",
                                    fontWeight: "bold",
                                    marginRight: "10px",
                                }}
                            >
                                View Details
                            </NavLink>
                            <button
                                onClick={() => navigate(`/edit-trip/${trip.id}`)}
                                style={{
                                    backgroundColor: "#28A745",
                                    color: "#fff",
                                    border: "none",
                                    padding: "5px 10px",
                                    borderRadius: "5px",
                                    marginRight: "10px",
                                    cursor: "pointer",
                                }}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(trip.id)}
                                style={{
                                    backgroundColor: "#DC3545",
                                    color: "#fff",
                                    border: "none",
                                    padding: "5px 10px",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TripList;
