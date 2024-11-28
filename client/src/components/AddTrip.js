import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTrip() {
    const [formData, setFormData] = useState({
        name: "",
        destination: "",
        start_date: "",
        end_date: "",
        user_id: 1, // Hardcode a user_id for testing; replace with dynamic logic as needed
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formattedPayload = {
            name: formData.name,
            destination: formData.destination,
            start_date: formData.start_date,
            end_date: formData.end_date,
            user_id: formData.user_id, // Ensure user_id is included
        };

        fetch("http://127.0.0.1:5555/trips", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formattedPayload),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Trip added successfully!");
                    navigate("/trips"); // Redirect back to the trip list
                } else {
                    return response.json().then((err) => {
                        throw new Error(err.error || "Failed to add trip.");
                    });
                }
            })
            .catch((error) => {
                console.error("Error adding trip:", error);
                alert(error.message || "Failed to add trip. Please try again.");
            });
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>Add New Trip</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Destination:
                    <input
                        type="text"
                        name="destination"
                        value={formData.destination}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Start Date:
                    <input
                        type="date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    End Date:
                    <input
                        type="date"
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <button type="submit">Add Trip</button>
            </form>
        </div>
    );
}

export default AddTrip;
