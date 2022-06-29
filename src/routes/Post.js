import React, { useEffect } from "react";
import useGetPost from "../hooks/useGetPost";
import useGetReplies from "../hooks/useGetReplies";
import { useParams } from "react-router-dom";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlagIcon from "@mui/icons-material/Flag";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import Reply from "../components/Reply";
import InputReply from "../components/InputReply";

const Post = () => {
    const params = useParams();
    const post = useGetPost(params.category, params.forum, params.id);
    const replies = useGetReplies(params.id);

    return (
        <Container maxWidth="lg">
            {post && (
                <Box sx={{ margin: "3em 0 3em 0" }}>
                    <Typography
                        variant="h1"
                        sx={{ fontSize: "2.5rem", fontWeight: "bold" }}
                    >
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
                    <Grid container sx={{ margin: "2em 0" }}>
                        <Grid item xs={12} sm={2}>
                            {post.data().author}
                        </Grid>
                        <Grid item xs={12} sm={10}>
                            <Typography sx={{ marginBottom: "2em" }}>
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
                            </Box>
                            <Divider sx={{ marginBottom: "1em" }} />
                        </Grid>
                    </Grid>
                </Box>
            )}
            {replies &&
                replies.map((reply, index) => {
                    return <Reply key={index} reply={reply} />;
                })}
            <InputReply />
        </Container>
    );
};

export default Post;
