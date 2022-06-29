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
            <Box sx={{ margin: "8rem 0 16rem 0" }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <ForumHeader />
                    <Link
                        to={`/create-post/${params.category}/${params.forum}`}
                    >
                        <Button color="secondary" variant="contained">
                            Create Post
                        </Button>
                    </Link>
                </Box>
                {posts && posts.length > 0 && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography variant="h5" sx={{ fontSize: "1rem" }}>
                            Topic
                        </Typography>
                        <Typography sx={{ fontSize: "1rem" }}>
                            Author
                        </Typography>
                    </Box>
                )}
                {posts &&
                    posts.map((post, index) => {
                        return <PostPreview key={index} post={post} />;
                    })}
                {posts && posts.length === 0 && (
                    <Typography>
                        There don't seem to be any posts yet. Be the first!
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default Forum;
