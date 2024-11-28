import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTrip() {
    const [formData, setFormData] = useState({
        name: "",
        destination: "",
        start_date: "",
        end_date: "",
        total_expense: "",
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://127.0.0.1:5555/trips", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Trip added successfully!");
                    navigate("/trips"); // Redirect back to the trip list
                } else {
                    alert("Failed to add trip. Please try again.");
                }
            })
            .catch((error) => console.error("Error adding trip:", error));
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
                <label>
                    Total Expense:
                    <input
                        type="number"
                        name="total_expense"
                        value={formData.total_expense}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <button type="submit">Add Trip</button>
            </form>
        </div>
    );
}

export default AddTrip;
