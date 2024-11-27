import React from "react";
import { useParams } from "react-router-dom";
import ExpenseList from "./ExpenseList";

function ExpensePage() {
    const { id: tripId } = useParams(); // Extract trip ID from URL
    return <ExpenseList tripId={tripId} />;
}

export default ExpensePage;
