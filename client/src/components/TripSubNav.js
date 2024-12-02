import React from "react";
import { NavLink } from "react-router-dom";

function TripSubNav({ tripId }) {
    if (!tripId) {
        console.error("TripSubNav: Missing tripId");
        return null; // Prevent rendering if tripId is undefined
    }

    return (
        <nav style={{ padding: "10px", display: "flex", gap: "10px" }}>
            <NavLink
                to={`/trip/${tripId}`}
                style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? "blue" : "black",
                    fontWeight: isActive ? "bold" : "normal",
                })}
            >
                Trip Details
            </NavLink>
            <NavLink
                to={`/trip/${tripId}/add-activity`}
                style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? "blue" : "black",
                    fontWeight: isActive ? "bold" : "normal",
                })}
            >
                Add Activity
            </NavLink>
            <NavLink
                to={`/trip/${tripId}/add-expense`}
                style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? "blue" : "black",
                    fontWeight: isActive ? "bold" : "normal",
                })}
            >
                Add Expense
            </NavLink>
        </nav>
    );
}

export default TripSubNav;
