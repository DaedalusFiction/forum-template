import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Breadcrumb from "../components/Breadcrumb";
import { useParams } from "react-router-dom";
import forumData from "../config/forumData.json";

const Category = () => {
    const params = useParams();
    const myCategory = forumData.categories.filter(
        (category) => category.name === params.category
    );
    const handleTest = () => {
        console.log(myCategory);
    };
    return (
        <Container>
            <Breadcrumb />
            {/* <Button onClick={handleTest}>test</Button> */}
            <Box>
                <Typography variant="h1" sx={{ textTransform: "capitalize" }}>
                    {params.category}
                </Typography>
            </Box>
            <Grid container spacing={4}>
                {myCategory[0].subcategories.map((subcategory) => {
                    return (
                        <Grid key={subcategory} item xs={12} sm={6} md={4}>
                            <Box
                                sx={{
                                    background: "var(--bg-light)",
                                    border: "1px solid var(--fc-primary-muted)",
                                    padding: "1em",
                                }}
                            >
                                <Typography>{subcategory}</Typography>
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
};

export default Category;
