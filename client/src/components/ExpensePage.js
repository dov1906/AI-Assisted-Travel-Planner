import React from "react";
import { useParams } from "react-router-dom";
import ExpenseList from "./ExpenseList";
import TripSubNav from "./TripSubNav";

function ExpensePage() {
    const { id: tripId } = useParams();

    return (
        <div>
            <TripSubNav tripId={tripId} />
            <ExpenseList tripId={tripId} />
        </div>
    );
}

export default ExpensePage;
