import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ForumHeader from "../components/ForumHeader";
import PostPreview from "../components/PostPreview";
import useGetPosts from "../hooks/useGetPosts";
import { Link } from "react-router-dom";

const Forum = () => {
    const params = useParams();
    const [posts] = useGetPosts(params.category, params.forum, params.page);

    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "5rem 0 2rem 0",
                }}
            >
                <ForumHeader />
                <Link to={`/create-post/${params.category}/${params.forum}`}>
                    <Button variant="contained">Create Post</Button>
                </Link>
            </Box>
            {posts &&
                posts.map((post, index) => {
                    return <PostPreview key={index} post={post} />;
                })}
            {posts && posts.length === 0 && (
                <Typography>
                    There don't seem to be any posts yet. Be the first!
                </Typography>
            )}
        </Container>
    );
};

export default Forum;
