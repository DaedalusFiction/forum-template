import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const ForumCategory = ({ category }) => {
    return (
        <Box sx={{ border: "1px solid green", padding: "1em" }}>
            <Typography variant="h2">{category.name}</Typography>
            <Typography variant="h6" sx={{ color: "var(--fc-primary-muted)" }}>
                {category.description}
            </Typography>
            <Grid container>
                {category.subcategories.map((subcategory) => {
                    return (
                        <Grid item xs={6}>
                            {subcategory}
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default ForumCategory;
