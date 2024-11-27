import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function App() {

    return (
        <div>
            <NavBar />
            <Outlet/> 
            {/* useOutletCOntext */}
        </div>
    );
}

export default App;
