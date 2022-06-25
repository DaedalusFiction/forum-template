import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import Layout from "./routes/Layout";
import Home from "./routes/Home";
import Nopage from "./routes/Nopage";
import Forums from "./routes/Forums";

const theme = createTheme({
    palette: {
        primary: {
            main: "#758ecd",
        },
        secondary: {
            main: "#e72419",
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="forums" element={<Forums />} />

                        <Route path="*" element={<Nopage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
