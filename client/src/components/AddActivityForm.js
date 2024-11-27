import React, { useState, useEffect } from "react";

function AddActivityForm({ tripId }) {
    const [trips, setTrips] = useState([]);
    const [selectedTripId, setSelectedTripId] = useState(tripId || "");
    const [activityName, setActivityName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState("");

    // Fetch trips for the dropdown
    useEffect(() => {
        fetch("http://127.0.0.1:5555/trips")
            .then((response) => response.json())
            .then((data) => setTrips(data))
            .catch((error) => console.error("Error fetching trips:", error));
    }, []);

    // Fetch activities for the selected trip
    useEffect(() => {
        if (selectedTripId) {
            fetch(`http://127.0.0.1:5555/trips/${selectedTripId}/activities`)
                .then((response) => response.json())
                .then((data) => setActivities(data))
                .catch((error) => console.error("Error fetching activities:", error));
        }
    }, [selectedTripId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedTripId) {
            alert("Please select a trip to add the activity to.");
            return;
        }

        // Prepare the activity payload
        const newActivity = {
            name: activityName,
            description,
            location,
        };

        // Post the activity to the selected trip
        fetch(`http://127.0.0.1:5555/trips/${selectedTripId}/activities`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newActivity),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Failed to add activity.");
                }
            })
            .then((addedActivity) => {
                setActivities([...activities, addedActivity]);
                setActivityName("");
                setDescription("");
                setLocation("");
                setError("");
            })
            .catch((error) => {
                console.error("Error adding activity:", error);
                setError("Failed to add activity. Please try again.");
            });
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>Add New Activity</h1>
            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                <div style={{ marginBottom: "10px" }}>
                    <label>
                        Select Trip:
                        <select
                            value={selectedTripId}
                            onChange={(e) => setSelectedTripId(e.target.value)}
                            required
                            style={{
                                marginLeft: "10px",
                                padding: "5px",
                                fontSize: "16px",
                            }}
                        >
                            <option value="">--Select a Trip--</option>
                            {trips.map((trip) => (
                                <option key={trip.id} value={trip.id}>
                                    {trip.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>
                        Activity Name:
                        <input
                            type="text"
                            value={activityName}
                            onChange={(e) => setActivityName(e.target.value)}
                            required
                            style={{
                                marginLeft: "10px",
                                padding: "5px",
                                fontSize: "16px",
                            }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>
                        Description:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            style={{
                                marginLeft: "10px",
                                padding: "5px",
                                fontSize: "16px",
                            }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>
                        Location:
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                            style={{
                                marginLeft: "10px",
                                padding: "5px",
                                fontSize: "16px",
                            }}
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        backgroundColor: "#007BFF",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Add Activity
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>

            <h2>Existing Activities</h2>
            {activities.length === 0 ? (
                <p>No activities added yet for this trip.</p>
            ) : (
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {activities.map((activity) => (
                        <li
                            key={activity.id}
                            style={{
                                margin: "10px 0",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                backgroundColor: "#f9f9f9",
                            }}
                        >
                            <strong>Name:</strong> {activity.name} <br />
                            <strong>Description:</strong> {activity.description} <br />
                            <strong>Location:</strong> {activity.location}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AddActivityForm;
