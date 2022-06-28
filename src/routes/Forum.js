import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ForumHeader from "../components/ForumHeader";
import PostPreview from "../components/PostPreview";
import useGetPosts from "../hooks/useGetPosts";

const Forum = () => {
    const params = useParams();
    const [posts] = useGetPosts(params.forum, params.page);
    useEffect(() => {
        if (posts) {
            console.log(posts[0].data().avatar);
        }
    }, [posts]);
    return (
        <Container maxWidth="md">
            <ForumHeader />
            {posts &&
                posts.map((post, index) => {
                    return <PostPreview key={index} post={post} />;
                })}
        </Container>
    );
};

export default Forum;
