import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import ForumCategory from "../components/ForumCategory";

const Forums = () => {
    const categoriesLeft = [
        {
            name: "General",
            description: "General Discussion",
            subcategories: ["first", "second", "third", "fourth"],
        },
        {
            name: "General",
            description: "General Discussion",
            subcategories: ["first", "second", "third"],
        },
        {
            name: "General",
            description: "General Discussion",
            subcategories: ["first", "second"],
        },
    ];
    const categoriesRight = [
        {
            name: "General",
            description: "General Discussion",
            subcategories: ["first", "second", "third", "fourth", "fifth"],
        },
        {
            name: "General",
            description: "General Discussion",
            subcategories: ["first", "second"],
        },
        {
            name: "General",
            description: "General Discussion",
            subcategories: ["first", "second", "third"],
        },
    ];
    return (
        <Container>
            <Typography variant="h1">Forums</Typography>
            <Grid container spacing={2}>
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1em",
                    }}
                >
                    {categoriesLeft.map((category) => {
                        return <ForumCategory category={category} />;
                    })}
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1em",
                    }}
                >
                    {categoriesRight.map((category) => {
                        return <ForumCategory category={category} />;
                    })}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Forums;
