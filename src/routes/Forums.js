import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import ForumCategory from "../components/ForumCategory";

const Forums = () => {
    const categoriesLeft = [
        {
            name: "general",
            description: "General Discussion",
            subcategories: ["Music Suggestions", "second", "third", "fourth"],
        },
        {
            name: "off-topic",
            description: "General Discussion",
            subcategories: ["first", "second", "third"],
        },
        {
            name: "announcements",
            description: "General Discussion",
            subcategories: ["first", "second"],
        },
    ];
    const categoriesRight = [
        {
            name: "news",
            description: "General Discussion",
            subcategories: ["first", "second", "third", "fourth", "fifth"],
        },
        {
            name: "suggestions",
            description: "General Discussion",
            subcategories: ["first", "second"],
        },
        {
            name: "questions",
            description: "General Discussion",
            subcategories: ["first", "second", "third"],
        },
    ];
    return (
        <Container>
            <Typography
                variant="h1"
                sx={{
                    fontSize: "4rem",
                    fontWeight: "bold",
                    margin: "1.5em 0 .25em 0",
                }}
            >
                Forums
            </Typography>
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
                        return (
                            <ForumCategory
                                key={category.name}
                                category={category}
                            />
                        );
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
                        return (
                            <ForumCategory
                                key={category.name}
                                category={category}
                            />
                        );
                    })}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Forums;
