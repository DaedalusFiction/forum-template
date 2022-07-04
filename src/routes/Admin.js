import { Container, Typography } from "@mui/material";
import React from "react";
import useGetFlaggedPosts from "../hooks/useGetFlaggedPosts";

const Admin = () => {
    const [posts] = useGetFlaggedPosts();

    return (
        <Container maxWidth="lg">
            {posts.map((post, index) => {
                return (
                    <Typography key={index}>{post.data().flaggedBy}</Typography>
                );
            })}
        </Container>
    );
};

export default Admin;
