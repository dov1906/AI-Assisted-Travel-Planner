import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function NewTripPage() {
    return (
        <div>
            {/* Secondary Navbar */}
            <nav
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    padding: "10px 0",
                    backgroundColor: "#f1f1f1",
                    borderBottom: "1px solid #ddd",
                }}
            >
                <NavLink
                    to="/new-trip/add"
                    style={({ isActive }) => ({
                        textDecoration: "none",
                        color: isActive ? "#007BFF" : "#333",
                        fontWeight: isActive ? "bold" : "normal",
                    })}
                >
                    Add a New Trip
                </NavLink>
                <NavLink
                    to="/new-trip/browse-prices"
                    style={({ isActive }) => ({
                        textDecoration: "none",
                        color: isActive ? "#007BFF" : "#333",
                        fontWeight: isActive ? "bold" : "normal",
                    })}
                >
                    Browse Flight Prices
                </NavLink>
                <NavLink
                    to="/new-trip/ask-ai"
                    style={({ isActive }) => ({
                        textDecoration: "none",
                        color: isActive ? "#007BFF" : "#333",
                        fontWeight: isActive ? "bold" : "normal",
                    })}
                >
                    Ask AI
                </NavLink>
            </nav>

            {/* Nested Routes Render Here */}
            <div style={{ padding: "20px" }}>
                <Outlet />
            </div>
        </div>
    );
}

export default NewTripPage;
