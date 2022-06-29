import { Box, Typography } from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";

const PostPreview = ({ post }) => {
    const params = useParams();
    const { topic, author, body } = post.data();
    const postLocation =
        "/posts/" + params.category + "/" + params.forum + "/" + post.id;
    return (
        <Link to={postLocation}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5" sx={{ fontSize: "1rem" }}>
                    Topic
                </Typography>
                <Typography sx={{ fontSize: "1rem" }}>Author</Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: ".5em",
                    border: "1px solid black",
                    background: "var(--bg-light)",
                    "&:hover": {
                        background: "white",
                    },
                }}
            >
                <Typography variant="h5">{topic}</Typography>
                <Typography>{author}</Typography>
            </Box>
        </Link>
    );
};

export default PostPreview;
