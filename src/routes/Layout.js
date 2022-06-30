import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Layout = () => {
    return (
        <>
            <Header />
            <Container>
                <Breadcrumb />
            </Container>
            <Outlet />
            <Footer />
        </>
    );
};

export default Layout;
