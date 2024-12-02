import React from "react";
import App from "./components/App";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import TripList from "./components/TripList";
import TripDetails from "./components/TripDetails";
import ActivityPlanner from "./components/ActivityPlanner";
import AddActivityForm from "./components/AddActivityForm";
import Profile from "./components/Profile";
import BrowsePrice from "./components/BrowsePrice";
import ExpensePage from "./components/ExpensePage";
import AddTrip from "./components/AddTrip";
import EditTrip from "./components/EditTrip";
import NewTripPage from "./components/NewTripPage";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/trips", element: <TripList /> },
            { path: "/trip/:id", element: <TripDetails /> },
            { path: "/trip/:id/activities", element: <ActivityPlanner /> },
            { path: "/trip/:id/add-activity", element: <AddActivityForm /> },
            { path: "/trip/:id/expenses", element: <ExpensePage /> },
            { path: "/trip/:id/add-expense", element: <ExpensePage /> }, // Add-expense explicitly
            { path: "/profile", element: <Profile /> },
            {
                path: "/new-trip",
                element: <NewTripPage />,
                children: [
                    { index: true, element: <AddTrip /> }, // Default to AddTrip
                    { path: "add", element: <AddTrip /> },
                    { path: "browse-prices", element: <BrowsePrice /> },
                    { path: "ask-ai", element: <ActivityPlanner /> },
                ],
            },
            { path: "/add-trip", element: <AddTrip /> }, // Direct AddTrip route
            { path: "/edit-trip/:id", element: <EditTrip /> },
        ],
    },
];

export default routes;
