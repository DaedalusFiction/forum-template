import { Grid, Tooltip, Typography } from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";

const PostPreview = ({ post }) => {
    const params = useParams();
    const { topic, authorUsername, body, replies, latestReply } = post.data();
    const postLocation =
        "/forums/" + params.category + "/" + params.forum + "/" + post.id;

    return (
        <Tooltip
            title={body.slice(0, 400) + "..."}
            enterDelay={500}
            enterNextDelay={500}
            followCursor
        >
            <Link to={postLocation}>
                <Grid
                    container
                    sx={{
                        padding: ".75em 1em",
                        borderTop: "1px solid var(--border-light)",
                        background: "var(--bg-light)",
                        "&:hover": {
                            background: "white",
                        },
                    }}
                >
                    <Grid item xs={6} md={9}>
                        <Typography
                            sx={{
                                fontSize: "1rem",
                                color: "var(--fc-primary-muted)",
                            }}
                        >
                            {topic.length > 50
                                ? topic.slice(0, 50) + "..."
                                : topic}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        md={1}
                        sx={{ display: "flex", justifyContent: "end" }}
                    >
                        <Typography
                            sx={{
                                fontSize: "1rem",
                                color: "var(--fc-primary-muted)",
                            }}
                        >
                            {authorUsername}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={0}
                        md={1}
                        sx={{
                            display: { xs: "none", md: "flex" },
                            justifyContent: "end",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "1rem",
                                color: "var(--fc-primary-muted)",
                            }}
                        >
                            {replies}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={0}
                        md={1}
                        sx={{
                            display: { xs: "none", md: "flex" },
                            justifyContent: "end",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "1rem",
                                color: "var(--fc-primary-muted)",
                            }}
                        >
                            {Math.round(
                                (Date.now() - latestReply) / 1000 / 60 / 60
                            ) + "h"}
                        </Typography>
                    </Grid>
                </Grid>
            </Link>
        </Tooltip>
    );
};

export default PostPreview;
