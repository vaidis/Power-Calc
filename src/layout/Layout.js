import * as React from "react";
import Container from "@mui/material/Container";

import Header from './Header'
import Footer from "./Footer";
import Houses from "../components/House/Houses";



export default function Layout() {
    return (
        <div>
            <Header />
            <Container maxWidth="md">
                <Houses />
            </Container>
            <Footer />
        </div>
    )
}