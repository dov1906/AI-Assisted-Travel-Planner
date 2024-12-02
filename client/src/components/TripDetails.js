import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TripSubNav from "./TripSubNav";

function TripDetails() {
    const { id } = useParams();
    const [trip, setTrip] = useState(null);
    const [activities, setActivities] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingActivity, setEditingActivity] = useState(null);
    const [editingExpense, setEditingExpense] = useState(null);

    useEffect(() => {
        fetchTripDetails();
    }, [id]);

    const fetchTripDetails = () => {
        fetch(`http://127.0.0.1:5555/trips/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setTrip(data);
                setActivities(data.activities || []);
                setExpenses(data.expenses || []);
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching trip details:", error));
    };

    const handleDeleteActivity = (activityId) => {
        fetch(`http://127.0.0.1:5555/activities/${activityId}`, { method: "DELETE" })
            .then((response) => {
                if (response.ok) {
                    setActivities(activities.filter((activity) => activity.id !== activityId));
                } else {
                    alert("Failed to delete activity.");
                }
            })
            .catch((error) => console.error("Error deleting activity:", error));
    };

    const handleDeleteExpense = (expenseId) => {
        fetch(`http://127.0.0.1:5555/expenses/${expenseId}`, { method: "DELETE" })
            .then((response) => {
                if (response.ok) {
                    setExpenses(expenses.filter((expense) => expense.id !== expenseId));
                } else {
                    alert("Failed to delete expense.");
                }
            })
            .catch((error) => console.error("Error deleting expense:", error));
    };

    const handleSaveActivity = (activityId) => {
        fetch(`http://127.0.0.1:5555/activities/${activityId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editingActivity),
        })
            .then((response) => {
                if (response.ok) {
                    setActivities(
                        activities.map((activity) =>
                            activity.id === activityId ? { ...activity, ...editingActivity } : activity
                        )
                    );
                    setEditingActivity(null);
                } else {
                    alert("Failed to update activity.");
                }
            })
            .catch((error) => console.error("Error updating activity:", error));
    };

    const handleSaveExpense = (expenseId) => {
        fetch(`http://127.0.0.1:5555/expenses/${expenseId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editingExpense),
        })
            .then((response) => {
                if (response.ok) {
                    setExpenses(
                        expenses.map((expense) =>
                            expense.id === expenseId ? { ...expense, ...editingExpense } : expense
                        )
                    );
                    setEditingExpense(null);
                } else {
                    alert("Failed to update expense.");
                }
            })
            .catch((error) => console.error("Error updating expense:", error));
    };

    if (loading) {
        return <p>Loading trip details...</p>;
    }

    if (!trip) {
        return <p>Trip not found!</p>;
    }

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <TripSubNav tripId={id} />
            <h1>{trip.name}</h1>
            <p>Destination: {trip.destination}</p>
            <p>Start Date: {trip.start_date}</p>
            <p>End Date: {trip.end_date}</p>

            <h2>Activities</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
                {activities.map((activity) =>
                    editingActivity && editingActivity.id === activity.id ? (
                        <div key={activity.id} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
                            <input
                                type="text"
                                value={editingActivity.name}
                                onChange={(e) =>
                                    setEditingActivity({ ...editingActivity, name: e.target.value })
                                }
                            />
                            <textarea
                                value={editingActivity.description}
                                onChange={(e) =>
                                    setEditingActivity({ ...editingActivity, description: e.target.value })
                                }
                            />
                            <input
                                type="text"
                                value={editingActivity.location}
                                onChange={(e) =>
                                    setEditingActivity({ ...editingActivity, location: e.target.value })
                                }
                            />
                            <button onClick={() => handleSaveActivity(activity.id)}>Save</button>
                            <button onClick={() => setEditingActivity(null)}>Cancel</button>
                        </div>
                    ) : (
                        <div
                            key={activity.id}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                                padding: "15px",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                backgroundColor: "#fff",
                            }}
                        >
                            <h3>{activity.name}</h3>
                            <p>{activity.description}</p>
                            <p>{activity.location}</p>
                            <button onClick={() => setEditingActivity(activity)}>Edit</button>
                            <button onClick={() => handleDeleteActivity(activity.id)}>Delete</button>
                        </div>
                    )
                )}
            </div>

            <h2>Expenses</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
                {expenses.map((expense) =>
                    editingExpense && editingExpense.id === expense.id ? (
                        <div key={expense.id} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
                            <input
                                type="number"
                                value={editingExpense.amount}
                                onChange={(e) =>
                                    setEditingExpense({ ...editingExpense, amount: parseFloat(e.target.value) })
                                }
                            />
                            <textarea
                                value={editingExpense.description}
                                onChange={(e) =>
                                    setEditingExpense({ ...editingExpense, description: e.target.value })
                                }
                            />
                            <button onClick={() => handleSaveExpense(expense.id)}>Save</button>
                            <button onClick={() => setEditingExpense(null)}>Cancel</button>
                        </div>
                    ) : (
                        <div
                            key={expense.id}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                                padding: "15px",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                backgroundColor: "#fff",
                            }}
                        >
                            <h3>${expense.amount.toFixed(2)}</h3>
                            <p>{expense.description}</p>
                            <button onClick={() => setEditingExpense(expense)}>Edit</button>
                            <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default TripDetails;
