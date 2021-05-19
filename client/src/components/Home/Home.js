import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import NavBar from "./Navbar";

function Home() {


    return (
        <div className="Container">
            <NavBar />
            <header>Voucher Service System</header>
            <h1>This is the home page</h1>
        </div>
    );
}

export default withRouter(Home);