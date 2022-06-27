import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    const links = [
        {
            text: "Link One",
            href: "https://davidjsorensen.com",
        },
        {
            text: "Link Two",
            href: "https://davidjsorensen.com",
        },
    ];
    const navigateToTop = () => {
        window.scrollTo(0, 0);
    };
    return (
        <Box
            sx={{
                backgroundColor: "var(--bg-accent)",
                padding: "2rem 0",
            }}
        >
            <Container>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "start",
                    }}
                >
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{ color: "white", marginBottom: "1em" }}
                        >
                            Forum Website
                        </Typography>
                        {links.map((item, index) => {
                            return (
                                <a
                                    key={index}
                                    href={item.href}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Typography
                                        sx={{
                                            color: "var(--fc-secondary-muted)",
                                            fontSize: ".8rem",
                                            "&:hover": { color: "white" },
                                        }}
                                        gutterBottom
                                    >
                                        {item.text}
                                    </Typography>
                                </a>
                            );
                        })}
                    </Box>
                    <Link to="/">
                        <Button onClick={navigateToTop} sx={{ color: "white" }}>
                            Back to Top
                        </Button>
                    </Link>
                </Box>
                <Typography
                    sx={{
                        fontSize: ".8rem",
                        color: "white",
                        textAlign: "center",
                    }}
                >
                    Website created by{" "}
                    <a
                        href="https://davidjsorensen.com"
                        target="_BLANK"
                        rel="noreferrer"
                        style={{ color: "white", textDecoration: "underline" }}
                    >
                        David J. Sorensen
                    </a>
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
