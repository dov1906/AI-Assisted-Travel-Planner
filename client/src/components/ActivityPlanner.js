import React, { useState } from "react";

function ActivityPlanner() {
    const [destination, setDestination] = useState("");
    const [duration, setDuration] = useState(3);
    const [interests, setInterests] = useState("");
    const [itinerary, setItinerary] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGenerateItinerary = () => {
        setLoading(true);
        setError("");
        setItinerary("");

        fetch(`/generate-itinerary?destination=${destination}&duration=${duration}&interests=${interests}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to generate itinerary");
                }
                return response.json();
            })
            .then((data) => {
                if (data.itinerary) {
                    setItinerary(data.itinerary);
                } else {
                    setError("Could not generate itinerary. Please try again.");
                }
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>Activity Planner</h1>
            <p>Plan your activities by generating a personalized itinerary based on your preferences.</p>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleGenerateItinerary();
                }}
                style={{
                    marginBottom: "20px",
                    padding: "15px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    backgroundColor: "#f9f9f9",
                }}
            >
                <div style={{ marginBottom: "10px" }}>
                    <label>
                        Destination:
                        <input
                            type="text"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            placeholder="Enter destination"
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
                        Duration (days):
                        <input
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            min="1"
                            max="7"
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
                        Interests:
                        <input
                            type="text"
                            value={interests}
                            onChange={(e) => setInterests(e.target.value)}
                            placeholder="e.g., food, museums, hiking"
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
                    disabled={loading}
                >
                    {loading ? "Generating..." : "Generate Itinerary"}
                </button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {itinerary && (
                <div
                    style={{
                        marginTop: "20px",
                        padding: "15px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        backgroundColor: "#f9f9f9",
                    }}
                >
                    <h2>Generated Itinerary</h2>
                    <pre style={{ fontSize: "16px", whiteSpace: "pre-wrap", lineHeight: "1.5" }}>
                        {itinerary}
                    </pre>
                </div>
            )}
        </div>
    );
}

export default ActivityPlanner;
