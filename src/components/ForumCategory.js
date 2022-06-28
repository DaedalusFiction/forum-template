import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

const ForumCategory = ({ category }) => {
    return (
        <Box
            sx={{
                border: "1px solid var(--fc-primary-muted)",
                padding: "1em",
                background: "var(--bg-light)",
                "&:hover": {
                    background: "white",
                },
            }}
        >
            <Typography
                variant="h2"
                sx={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                }}
            >
                {category.name}
            </Typography>
            <Typography variant="h6" sx={{ color: "var(--fc-primary-muted)" }}>
                {category.description}
            </Typography>
            <Grid container>
                {category.subcategories.map((subcategory) => {
                    return (
                        <Grid item xs={6}>
                            <Link
                                to={
                                    "/forums/" +
                                    category.name +
                                    "/" +
                                    subcategory
                                }
                            >
                                <Typography
                                    sx={{ textTransform: "capitalize" }}
                                >
                                    {subcategory}
                                </Typography>
                            </Link>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default ForumCategory;
