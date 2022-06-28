import { Box, Typography } from "@mui/material";
import React from "react";

const PostPreview = ({ post }) => {
    const { topic, author, body } = post.data();
    return (
        <Box>
            <Typography variant="h4">{topic}</Typography>
            <Typography>{author}</Typography>
            <Typography>{body}</Typography>
        </Box>
    );
};

export default PostPreview;
