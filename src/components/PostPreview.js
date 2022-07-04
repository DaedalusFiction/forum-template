import { Box, Button, Tooltip, Typography } from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";

const PostPreview = ({ post }) => {
    const params = useParams();
    const { topic, authorUsername, body, replies } = post.data();
    const postLocation =
        "/forums/" + params.category + "/" + params.forum + "/" + post.id;

    return (
        <Tooltip title={body.slice(0, 400) + "..."} followCursor>
            <Link to={postLocation}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: ".75em 1em",
                        borderTop: "1px solid var(--border-light)",
                        background: "var(--bg-light)",
                        "&:hover": {
                            background: "white",
                        },
                    }}
                >
                    <Typography variant="h5">{topic}</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "10rem",
                        }}
                    >
                        <Typography>{authorUsername}</Typography>
                        <Typography>{replies}</Typography>
                    </Box>
                </Box>
            </Link>
        </Tooltip>
    );
};

export default PostPreview;
