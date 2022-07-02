import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostPreview from "../components/PostPreview";
import useGetPosts from "../hooks/useGetPosts";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

const Forum = () => {
    const params = useParams();
    const [posts] = useGetPosts(params.category, params.forum, params.page);

    return (
        <Container maxWidth="lg">
            <Breadcrumb />
            <Box>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "1em",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{ textTransform: "capitalize" }}
                    >
                        {params.forum}
                    </Typography>
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
                            marginBottom: ".5em",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "1rem",
                                color: "var(--fc-primary-muted)",
                            }}
                        >
                            Topic
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "10rem",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "1rem",
                                    color: "var(--fc-primary-muted)",
                                }}
                            >
                                Author
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "1rem",
                                    color: "var(--fc-primary-muted)",
                                }}
                            >
                                Replies
                            </Typography>
                        </Box>
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
