import React, { useState } from "react";

function BrowsePrice() {
    const [formData, setFormData] = useState({
        departureAirport: "",
        arrivalAirport: "",
        departureDate: "",
        returnDate: "",
        passengers: 1,
        cabinClass: "Economy",
    });
    const [results, setResults] = useState(null);
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setResults(null);

        fetch(
            `/api/roundtrip?departure_airport_code=${formData.departureAirport}&arrival_airport_code=${formData.arrivalAirport}&departure_date=${formData.departureDate}&arrival_date=${formData.returnDate}&number_of_adults=${formData.passengers}&cabin_class=${formData.cabinClass}`
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    const formattedFlights = data.map((flight) => ({
                        departure: flight.departure,
                        arrival: flight.arrival,
                        price: flight.price || "Not Available",
                        duration: `${Math.floor(flight.duration_minutes / 60)}h ${flight.duration_minutes % 60}m`,
                        stops: flight.stops,
                    }));
                    setResults(formattedFlights);
                }
            })
            .catch(() => setError("Error fetching flight data."));
    };

    return (
        <div>
            <h1>Browse Prices</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <h2>Flight Search</h2>
                    <label>
                        Departure Airport:
                        <input
                            type="text"
                            name="departureAirport"
                            value={formData.departureAirport}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Arrival Airport:
                        <input
                            type="text"
                            name="arrivalAirport"
                            value={formData.arrivalAirport}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Departure Date:
                        <input
                            type="date"
                            name="departureDate"
                            value={formData.departureDate}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Return Date:
                        <input
                            type="date"
                            name="returnDate"
                            value={formData.returnDate}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Passengers:
                        <input
                            type="number"
                            name="passengers"
                            value={formData.passengers}
                            onChange={handleInputChange}
                            min="1"
                            required
                        />
                    </label>
                    <label>
                        Cabin Class:
                        <select
                            name="cabinClass"
                            value={formData.cabinClass}
                            onChange={handleInputChange}
                        >
                            <option value="Economy">Economy</option>
                            <option value="Business">Business</option>
                            <option value="First">First</option>
                        </select>
                    </label>
                </div>
                <button type="submit">Search</button>
            </form>

            {error && <p>{error}</p>}

            {results && (
                <div>
                    <h2>Results</h2>
                    <ul>
                        {results.map((result, index) => (
                            <li key={index}>
                                <strong>{result.name || `Flight ${index + 1}`}</strong>
                                <p>Price: {result.price}</p>
                                {result.duration && <p>Duration: {result.duration}</p>}
                                {result.stops !== undefined && <p>Stops: {result.stops}</p>}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default BrowsePrice;
