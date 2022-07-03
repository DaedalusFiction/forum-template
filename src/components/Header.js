import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useLocation } from "react-router-dom";
import Profile from "../components/Profile.js";

const pages = ["Forums", "Two", "Three"];

const Header = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const pathArray = window.location.pathname.split("/");

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar
            position="static"
            sx={{ backgroundColor: "var(--bg-accent)", marginBottom: "8rem" }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        sx={{
                            display: {
                                xs: "none",
                                md: "flex",
                                marginRight: "2em",
                            },
                        }}
                    >
                        <Link to="/">
                            <Typography>THE FORUMS</Typography>
                        </Link>
                    </Box>

                    <Box
                        sx={{
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            sx={{ color: "var(--fc-secondary-muted)" }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Link to={page.toLowerCase()}>
                                        <Typography
                                            textAlign="center"
                                            sx={{ color: "var(--fc-primary)" }}
                                        >
                                            {page}
                                        </Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box
                        sx={{
                            display: {
                                xs: "flex",
                                md: "none",
                            },
                            margin: "0 auto",
                        }}
                    >
                        <Link to="/">
                            <Typography>THE FORUMS</Typography>
                        </Link>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: {
                                xs: "none",
                                md: "flex",
                            },
                        }}
                    >
                        {pages.map((page, index) => (
                            <Link key={page} to={page.toLowerCase()}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color:
                                            pathArray[1] ===
                                            `${page.toLowerCase()}`
                                                ? "white"
                                                : "var(--fc-secondary-muted)",
                                        display: "block",
                                        "&:hover": {
                                            color: "white",
                                        },
                                    }}
                                >
                                    {page}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    <Profile />
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;
