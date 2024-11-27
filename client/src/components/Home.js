import React from "react";
import { NavLink } from "react-router-dom";

function Home() {
    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>Welcome to the AI-Assisted Travel Planner</h1>
            <p>
                Your one-stop solution for managing trips, planning activities, and tracking expenses effortlessly. 
                Experience smarter travel with our advanced features tailored to make your journeys more enjoyable and organized.
            </p>

            <section style={{ marginTop: "20px" }}>
                <h2>Key Features</h2>
                <ul>
                    <li><strong>Personalized Travel Plans:</strong> Organize trips with customized itineraries.</li>
                    <li><strong>Activity Suggestions:</strong> Use AI to discover exciting activities and experiences.</li>
                    <li><strong>Expense Management:</strong> Track, split, and manage travel expenses seamlessly.</li>
                    <li><strong>Real-Time Price Comparisons:</strong> Find the best prices for flights and hotels.</li>
                </ul>
            </section>

            <section style={{ marginTop: "20px" }}>
                <h2>Explore the App</h2>
                <div style={{ marginBottom: "20px" }}>
                    <h3>Your Trips</h3>
                    <p>Access and manage all your trips in one place. Plan new adventures or update existing itineraries.</p>
                    <NavLink to="/trips" style={{ textDecoration: "none", color: "#007BFF" }}>View Your Trips</NavLink>
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <h3>Plan Activities</h3>
                    <p>Discover and organize activities for your trip with AI-generated suggestions.</p>
                    <NavLink to="/trip/:id/activities" style={{ textDecoration: "none", color: "#007BFF" }}>Plan Activities</NavLink>
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <h3>Manage Expenses</h3>
                    <p>Keep track of your trip costs and split expenses among travelers easily.</p>
                    <NavLink to="/trip/:id/expenses" style={{ textDecoration: "none", color: "#007BFF" }}>Manage Expenses</NavLink>
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <h3>Your Profile</h3>
                    <p>Update your account settings and customize your travel preferences.</p>
                    <NavLink to="/profile" style={{ textDecoration: "none", color: "#007BFF" }}>Go to Profile</NavLink>
                </div>
            </section>

            <footer style={{ marginTop: "30px", fontSize: "0.9em", color: "#555" }}>
                <p>Start planning your next adventure today with the AI-Assisted Travel Planner!</p>
            </footer>
        </div>
    );
}

export default Home;
