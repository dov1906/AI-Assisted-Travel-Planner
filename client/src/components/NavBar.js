import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
    const navLinkStyle = ({ isActive }) => ({
        textDecoration: "none",
        color: isActive ? "#007BFF" : "#333",
        fontWeight: isActive ? "bold" : "normal",
    });

    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 20px",
                backgroundColor: "#f8f9fa",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
        >
            <div style={{ display: "flex", gap: "15px" }}>

                <NavLink to="/trips" style={navLinkStyle}>
                    My Trips
                </NavLink>
                <NavLink to="/new-trip/add" style={navLinkStyle}>
                    New Trip
                </NavLink>
                <NavLink to="/profile" style={navLinkStyle}>
                    Profile
                </NavLink>
                <NavLink to="/" style={navLinkStyle}>
                    About
                </NavLink>
            </div>
        </nav>
    );
}

export default NavBar;
