import React, { useState, useEffect } from "react";

function ExpenseList({ tripId }) {
    const [expenses, setExpenses] = useState([]);
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        // Fetch expenses for the specific trip
        fetch(`http://127.0.0.1:5555/trips/${tripId}/expenses`)
            .then((response) => response.json())
            .then((data) => setExpenses(data))
            .catch((error) => console.error("Error fetching expenses:", error));
    }, [tripId]);

    const handleAddExpense = (e) => {
        e.preventDefault();

        // Post new expense to the backend
        fetch(`http://127.0.0.1:5555/trips/${tripId}/expenses`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: parseFloat(amount), // Convert to a number
                description,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Failed to add expense.");
                }
            })
            .then((newExpense) => {
                setExpenses([...expenses, newExpense]);
                setAmount("");
                setDescription("");
                setError("");
            })
            .catch((error) => {
                console.error(error);
                setError("Failed to add expense. Please try again.");
            });
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>Expenses</h1>
            <p>Manage your trip expenses here.</p>

            <form onSubmit={handleAddExpense} style={{ marginBottom: "20px" }}>
                <h2>Add New Expense</h2>
                <div style={{ marginBottom: "10px" }}>
                    <label>
                        Amount:
                        <input
                            type="number"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            style={{
                                marginLeft: "10px",
                                padding: "5px",
                                fontSize: "16px",
                            }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>
                        Description:
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{
                                marginLeft: "10px",
                                padding: "5px",
                                fontSize: "16px",
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
                >
                    Add Expense
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>

            <h2>Existing Expenses</h2>
            {expenses.length === 0 ? (
                <p>No expenses added yet for this trip.</p>
            ) : (
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {expenses.map((expense) => (
                        <li
                            key={expense.id}
                            style={{
                                margin: "10px 0",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                backgroundColor: "#f9f9f9",
                            }}
                        >
                            <strong>Amount:</strong> ${expense.amount.toFixed(2)} <br />
                            <strong>Description:</strong> {expense.description}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ExpenseList;
