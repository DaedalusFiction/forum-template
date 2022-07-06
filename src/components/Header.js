import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { Link, useLocation } from "react-router-dom";
import Profile from "../components/Profile.js";
import { useState } from "react";

const pages = ["forums"];

const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const location = useLocation();

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
                                            sx={{
                                                color: "var(--fc-primary)",
                                                textTransform: "capitalize",
                                            }}
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
                                <Typography
                                    sx={{
                                        margin: "0 1em",
                                        color:
                                            location.pathname.split("/")[1] ===
                                            `${page}`
                                                ? "white"
                                                : "var(--fc-secondary-muted)",
                                        display: "block",
                                        "&:hover": {
                                            color: "white",
                                        },
                                        textTransform: "uppercase",
                                    }}
                                >
                                    {page}
                                </Typography>
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
