import React from 'react'
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from './Footer';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Layout() {
    return (
        <div>
            <Navbar />
            <Outlet />
            <ToastContainer />
            <Footer />
        </div>
    )
}

export default Layout