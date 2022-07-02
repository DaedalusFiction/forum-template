import React, { useEffect, useState } from "react";
import useGetPost from "../hooks/useGetPost";
import useGetReplies from "../hooks/useGetReplies";
import { useParams } from "react-router-dom";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlagIcon from "@mui/icons-material/Flag";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import DeleteIcon from "@mui/icons-material/Delete";
import Reply from "../components/Reply";
import InputReply from "../components/InputReply";
import { selectSiteUser } from "../features/user/userSlice";

import { useSelector } from "react-redux";
import Notification from "../components/Notification";
import Breadcrumb from "../components/Breadcrumb";

const Post = () => {
    const params = useParams();
    const siteUser = useSelector(selectSiteUser);
    const post = useGetPost(params.category, params.forum, params.id);
    const replies = useGetReplies(params.category, params.forum, params.id);

    return (
        <Container maxWidth="lg">
            <Breadcrumb />
            <Box>
                {post && (
                    <Box>
                        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                            {post.data().topic}
                        </Typography>
                        <Typography
                            sx={{
                                textTransform: "capitalize",
                                marginBottom: "2em",
                            }}
                        >
                            {params.category}
                        </Typography>
                        <Divider />
                        <Grid container spacing={2} sx={{ margin: "2em 0" }}>
                            <Grid item xs={12} sm={2}>
                                <Typography sx={{ fontWeight: "bold" }}>
                                    {post.data().author}:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={10}>
                                <Typography
                                    sx={{
                                        marginBottom: "2em",
                                        maxWidth: "75ch",
                                    }}
                                >
                                    {post.data().body}
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: ".5em",
                                        justifyContent: "end",
                                        marginBottom: "1em",
                                    }}
                                >
                                    <FormatQuoteIcon />
                                    <ReplyIcon />
                                    <FavoriteIcon />
                                    <FlagIcon />
                                    <DeleteIcon />
                                </Box>
                                <Divider sx={{ marginBottom: "1em" }} />
                                <Typography
                                    sx={{
                                        color: "var(--fc-primary-muted)",
                                        fontSize: ".75rem",
                                    }}
                                >
                                    Last updated:{" "}
                                    {post.data().createdAt &&
                                        new Date(
                                            post.data().createdAt
                                        ).toLocaleDateString("en-us", {
                                            weekday: "short",
                                            month: "short",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "numeric",
                                        })}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                )}
                {replies &&
                    replies.map((reply, index) => {
                        return <Reply key={index} reply={reply} />;
                    })}
                <InputReply />
            </Box>
        </Container>
    );
};

export default Post;
