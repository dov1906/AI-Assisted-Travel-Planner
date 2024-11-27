import React, { useState, useEffect } from "react";

function AddActivityForm() {
    const [trips, setTrips] = useState([]);
    const [selectedTripId, setSelectedTripId] = useState("");
    const [activityName, setActivityName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");

    // Fetch trips for the dropdown
    useEffect(() => {
        fetch("http://127.0.0.1:5555/trips")
            .then((response) => response.json())
            .then((data) => setTrips(data))
            .catch((error) => console.error("Error fetching trips:", error));
    }, []);

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
                    alert("Activity added successfully!");
                    // Reset the form
                    setActivityName("");
                    setDescription("");
                    setLocation("");
                    setSelectedTripId("");
                } else {
                    alert("Failed to add activity. Please try again.");
                }
            })
            .catch((error) => console.error("Error adding activity:", error));
    };

    return (
        <div>
            <h1>Add New Activity</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Select Trip:
                    <select
                        value={selectedTripId}
                        onChange={(e) => setSelectedTripId(e.target.value)}
                        required
                    >
                        <option value="">--Select a Trip--</option>
                        {trips.map((trip) => (
                            <option key={trip.id} value={trip.id}>
                                {trip.name}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Activity Name:
                    <input
                        type="text"
                        value={activityName}
                        onChange={(e) => setActivityName(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Location:
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Add Activity</button>
            </form>
        </div>
    );
}

export default AddActivityForm;
