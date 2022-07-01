import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

const CategoryBox = ({ category }) => {
    return (
        <Box
            sx={{
                border: "1px solid var(--border-light)",
                padding: "1em",
                background: "var(--bg-light)",
                "&:hover": {
                    background: "white",
                },
            }}
        >
            <Link to={category.name}>
                <Typography
                    variant="h2"
                    sx={{
                        textTransform: "capitalize",
                    }}
                >
                    {category.name}
                </Typography>
                <Typography
                    sx={{
                        color: "var(--fc-primary-muted)",
                        marginBottom: "1rem",
                    }}
                >
                    {category.description}
                </Typography>
            </Link>
            <Grid container>
                {category.subcategories.map((subcategory) => {
                    return (
                        <Grid key={subcategory} item xs={6}>
                            <Link to={category.name + "/" + subcategory}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        textTransform: "capitalize",
                                        "&:hover": {
                                            textDecoration: "underline",
                                        },
                                    }}
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

export default CategoryBox;
