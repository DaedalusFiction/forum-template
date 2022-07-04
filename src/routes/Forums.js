import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import CategoryBox from "../components/CategoryBox";
import forumData from "../config/forumData.json";

const Forums = () => {
    return (
        <Container>
            <Typography variant="h1" sx={{ marginBottom: "1em" }}>
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
                    {forumData.categories.map((category, index) => {
                        return (
                            index % 2 === 0 && (
                                <CategoryBox
                                    key={category.name}
                                    category={category}
                                />
                            )
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
                    {forumData.categories.map((category, index) => {
                        return (
                            index % 2 === 1 && (
                                <CategoryBox
                                    key={category.name}
                                    category={category}
                                />
                            )
                        );
                    })}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Forums;
