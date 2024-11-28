import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditTrip() {
    const { id } = useParams(); // Get the trip ID from the URL
    const [formData, setFormData] = useState({
        name: "",
        destination: "",
        start_date: "",
        end_date: "",
        total_expense: "", // Optional, include if needed
    });
    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(""); // For error messages
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        // Fetch the trip details when the component mounts
        fetch(`http://127.0.0.1:5555/trips/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch trip details.");
                }
                return response.json();
            })
            .then((data) => {
                setFormData(data);
                setLoading(false); // Mark loading as false
            })
            .catch((error) => {
                console.error("Error fetching trip details:", error);
                setError("Could not load trip details. Please try again later.");
                setLoading(false);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    
        const { name, destination, start_date, end_date } = formData;
    
        const formattedPayload = {
            name,
            destination,
            start_date,
            end_date,
        };
    
        console.log("Formatted Payload:", formattedPayload);
    
        fetch(`http://127.0.0.1:5555/trips/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formattedPayload),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Trip updated successfully!");
                    navigate("/trips");
                } else {
                    return response.json().then((err) => {
                        throw new Error(err.error || "Failed to update trip.");
                    });
                }
            })
            .catch((error) => {
                console.error("Error updating trip:", error);
                alert(error.message || "Failed to update trip. Please try again.");
            });
    };
    

    if (loading) {
        return <p>Loading trip details...</p>;
    }

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>Edit Trip</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
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

                <button type="submit" style={{ marginTop: "10px" }}>
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default EditTrip;
