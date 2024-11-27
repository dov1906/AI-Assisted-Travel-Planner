import React, { useState, useEffect } from "react";

function Profile() {
    const [userData, setUserData] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Simulated API call to fetch user data
        fetch("http://127.0.0.1:5555/user")
            .then((response) => response.json())
            .then((data) => {
                setUserData(data);
                setName(data.name);
                setEmail(data.email);
            })
            .catch((error) => console.error("Error fetching user data:", error));
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        // Simulated API call to update user data
        fetch("http://127.0.0.1:5555/user", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        })
            .then((response) => {
                if (response.ok) {
                    setMessage("Profile updated successfully!");
                    setIsEditing(false);
                    setPassword(""); // Clear password field after updating
                } else {
                    throw new Error("Failed to update profile.");
                }
            })
            .catch((error) => {
                console.error(error);
                setMessage("Error updating profile. Please try again.");
            });
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>Profile</h1>
            <p>Manage your account settings and preferences.</p>

            {!isEditing ? (
                <div
                    style={{
                        padding: "15px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        backgroundColor: "#f9f9f9",
                    }}
                >
                    <h2>Account Information</h2>
                    <p>
                        <strong>Name:</strong> {userData.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {userData.email}
                    </p>
                    <button
                        onClick={() => setIsEditing(true)}
                        style={{
                            padding: "10px 20px",
                            fontSize: "16px",
                            backgroundColor: "#007BFF",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Edit Profile
                    </button>
                </div>
            ) : (
                <form
                    onSubmit={handleUpdate}
                    style={{
                        marginTop: "20px",
                        padding: "15px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        backgroundColor: "#f9f9f9",
                    }}
                >
                    <h2>Edit Profile</h2>
                    <div style={{ marginBottom: "10px" }}>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                            Email:
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                            Password:
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
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
                            marginRight: "10px",
                        }}
                    >
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setIsEditing(false);
                            setMessage("");
                        }}
                        style={{
                            padding: "10px 20px",
                            fontSize: "16px",
                            backgroundColor: "gray",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Cancel
                    </button>
                </form>
            )}
            {message && <p style={{ color: message.includes("Error") ? "red" : "green" }}>{message}</p>}
        </div>
    );
}

export default Profile;
