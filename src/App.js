import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Layout from "./routes/Layout";
import Home from "./routes/Home";
import Nopage from "./routes/Nopage";
import Forums from "./routes/Forums";
import Settings from "./routes/Settings";
import Forum from "./routes/Forum";
import Post from "./routes/Post";
import CreatePost from "./routes/CreatePost";
import Category from "./routes/Category";
import Admin from "./routes/Admin";

const theme = createTheme({
    palette: {
        background: {
            default: "rgb(250, 250, 250)",
        },
        primary: {
            main: "#2F9C95",
        },
        secondary: {
            main: "#C42021",
        },
    },
    typography: {
        fontFamily: "var(--ff-primary)",
        color: "var(--fc-primary)",
        h1: {
            fontSize: "clamp(3rem, 4vw, 10.5rem)",
            fontFamily: "var(--ff-secondary)",
            fontWeight: "bold",
        },
        h2: {
            fontSize: "clamp(2.25rem, 3vw, 10.5rem)",

            fontFamily: "var(--ff-secondary)",
        },

        h5: {
            fontSize: "1.2rem",
        },
        h6: {
            lineHeight: "1.25rem",
            fontSize: "1.2rem",
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="forums" element={<Forums />} />
                        <Route path="admin" element={<Admin />} />
                        <Route
                            path="/create-post"
                            element={<Navigate replace to="/forums" />}
                        />

                        <Route
                            path="/create-post/:category/:forum"
                            element={<CreatePost />}
                        />

                        <Route
                            path="/forums/:category"
                            element={<Category />}
                        />
                        <Route
                            path="/forums/:category/:forum"
                            element={<Forum />}
                        />
                        <Route
                            path="/forums/:category/:forum/:id"
                            element={<Post />}
                        />
                        <Route path="settings" element={<Settings />} />

                        <Route path="*" element={<Nopage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
