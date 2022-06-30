import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
        h1: {
            fontSize: "3.5rem",
        },
        h5: {
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

                        <Route
                            path="/create-post/:category/:forum"
                            element={<CreatePost />}
                        />

                        <Route
                            path="/forums/:category/:forum"
                            element={<Forum />}
                        />
                        <Route
                            path="/forums/:category"
                            element={<Category />}
                        />
                        <Route
                            path="/posts/:category/:forum/:id"
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
