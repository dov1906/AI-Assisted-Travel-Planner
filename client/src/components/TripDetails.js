import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TripSubNav from "./TripSubNav"; // Import the sub-navigation

function TripDetail() {
    const { id } = useParams(); // Get the trip ID from the URL
    const [trip, setTrip] = useState(null);
    const [activities, setActivities] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch trip details
        fetch(`http://127.0.0.1:5555/trips/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setTrip(data);
                setActivities(data.activities || []);
                setExpenses(data.expenses || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching trip details:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <p>Loading trip details...</p>
            </div>
        );
    }

    if (!trip) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <p>Trip not found!</p>
            </div>
        );
    }

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            {/* Sub-navigation for the trip */}
            <TripSubNav tripId={id} />

            <div style={{ maxWidth: "800px", margin: "20px auto", textAlign: "center" }}>
                <h1 style={{ marginBottom: "10px", fontSize: "28px", color: "#333" }}>
                    {trip.name}
                </h1>
                <p style={{ fontSize: "18px", color: "#555" }}>
                    <strong>Destination:</strong> {trip.destination}
                </p>
                <p style={{ fontSize: "18px", color: "#555" }}>
                    <strong>Start Date:</strong> {trip.start_date}
                </p>
                <p style={{ fontSize: "18px", color: "#555" }}>
                    <strong>End Date:</strong> {trip.end_date}
                </p>
            </div>

            <div style={{ margin: "30px auto", maxWidth: "1200px" }}>
                {/* Activities Section */}
                <div>
                    <h2 style={{ fontSize: "24px", color: "#007BFF" }}>Activities</h2>
                    {activities.length > 0 ? (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                                gap: "20px",
                                marginTop: "20px",
                            }}
                        >
                            {activities.map((activity) => (
                                <div
                                    key={activity.id}
                                    style={{
                                        border: "1px solid #ddd",
                                        borderRadius: "10px",
                                        padding: "15px",
                                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                        backgroundColor: "#fff",
                                    }}
                                >
                                    <h3
                                        style={{
                                            fontSize: "20px",
                                            marginBottom: "10px",
                                            color: "#333",
                                        }}
                                    >
                                        {activity.name}
                                    </h3>
                                    <p style={{ fontSize: "16px", color: "#555" }}>
                                        {activity.description}
                                    </p>
                                    {activity.location && (
                                        <p style={{ fontSize: "16px", color: "#555" }}>
                                            <strong>Location:</strong> {activity.location}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ fontSize: "16px", color: "#555" }}>No activities added yet.</p>
                    )}
                </div>

                {/* Expenses Section */}
                <div style={{ marginTop: "40px" }}>
                    <h2 style={{ fontSize: "24px", color: "#007BFF" }}>Expenses</h2>
                    {expenses.length > 0 ? (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                                gap: "20px",
                                marginTop: "20px",
                            }}
                        >
                            {expenses.map((expense) => (
                                <div
                                    key={expense.id}
                                    style={{
                                        border: "1px solid #ddd",
                                        borderRadius: "10px",
                                        padding: "15px",
                                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                        backgroundColor: "#fff",
                                    }}
                                >
                                    <h3
                                        style={{
                                            fontSize: "20px",
                                            marginBottom: "10px",
                                            color: "#333",
                                        }}
                                    >
                                        {expense.description || "No Description"}
                                    </h3>
                                    <p style={{ fontSize: "16px", color: "#555" }}>
                                        <strong>Amount:</strong> ${expense.amount.toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ fontSize: "16px", color: "#555" }}>
                            No expenses recorded yet.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TripDetail;
