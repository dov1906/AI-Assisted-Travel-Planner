import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TripSubNav from "./TripSubNav";

function AddActivityForm() {
    const { id: tripId } = useParams(); // Extract tripId from URL
    const [activityName, setActivityName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [activities, setActivities] = useState([]); // State to track activities
    const [error, setError] = useState("");

    // Fetch existing activities for the trip
    useEffect(() => {
        fetch(`http://127.0.0.1:5555/trips/${tripId}/activities`)
            .then((response) => response.json())
            .then((data) => setActivities(data))
            .catch((error) => console.error("Error fetching activities:", error));
    }, [tripId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newActivity = { name: activityName, description, location };

        fetch(`http://127.0.0.1:5555/trips/${tripId}/activities`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newActivity),
        })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to add activity");
                return response.json();
            })
            .then((addedActivity) => {
                setActivities([...activities, addedActivity]); // Append new activity
                setActivityName("");
                setDescription("");
                setLocation("");
                setError("");
            })
            .catch((error) => setError(error.message));
    };

    return (
        <div>
            <TripSubNav tripId={tripId} /> {/* Include SubNav */}
            <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
                <h1>Add New Activity</h1>
                <form onSubmit={handleSubmit}>
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
                                    width: "100%",
                                    boxSizing: "border-box",
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
                                    width: "100%",
                                    boxSizing: "border-box",
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
                                    width: "100%",
                                    boxSizing: "border-box",
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
                </form>
                {error && <p style={{ color: "red" }}>{error}</p>}

                {/* Render list of activities */}
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
                                <strong>{activity.name}</strong>
                                <p>{activity.description}</p>
                                {activity.location && <p>Location: {activity.location}</p>}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default AddActivityForm;
