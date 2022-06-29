import React, { useState } from "react";

import {
    collection,
    addDoc,
    doc,
    collectionGroup,
    query,
    orderBy,
    limit,
    getDocs,
    getDoc,
    where,
    startAfter,
} from "firebase/firestore";

import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    TextareaAutosize,
    Typography,
} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlagIcon from "@mui/icons-material/Flag";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { selectSiteUser } from "../features/user/userSlice";

import { useSelector } from "react-redux";
import { db } from "../firebase";

const CreatePost = () => {
    const [topic, setTopic] = useState("");
    const [body, setBody] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const siteUser = useSelector(selectSiteUser);
    const params = useParams();
    const navigate = useNavigate();

    const handleBodyChange = (e) => {
        setBody(e.target.value);
    };
    const handleTopicChange = (e) => {
        setTopic(e.target.value);
    };

    const handleSubmitPost = async (e) => {
        e.preventDefault();
        if (!submitted) {
            const folderRef = collection(
                db,
                `forums/${params.category}/${params.forum}`
            );
            const docRef = await addDoc(folderRef, {
                author: siteUser.handle,
                topic: topic,
                body: body,
                createdAt: Date.now(),
            });
            navigate(`/posts/${params.category}/${params.forum}/${docRef.id}`);
        }
        setSubmitted(true);
    };
    return (
        <Container>
            <Box sx={{ margin: "8em 0 20em 0" }}>
                <Typography variant="h1" sx={{ fontSize: "3rem" }}>
                    Create a Post
                </Typography>
                {siteUser && !submitted && (
                    <Box>
                        <Divider />
                        <Grid container sx={{ margin: "2em 0" }}>
                            <Grid item xs={12} sm={2}>
                                {siteUser.handle}
                            </Grid>
                            <Grid item xs={12} sm={10}>
                                <TextareaAutosize
                                    onChange={handleTopicChange}
                                    aria-label="topic-post"
                                    rows={1}
                                    placeholder="Enter a Title..."
                                    style={{ width: "100%", padding: "1em" }}
                                />
                                <TextareaAutosize
                                    onChange={handleBodyChange}
                                    aria-label="body-reply"
                                    minRows={6}
                                    placeholder="Write something pleasant..."
                                    style={{ width: "100%", padding: "1em" }}
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{ display: "flex", justifyContent: "end" }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleSubmitPost}
                            >
                                Post
                            </Button>
                        </Box>
                    </Box>
                )}
                {!siteUser && <Typography>Log in to create a post</Typography>}
                {submitted && <Typography>Post Created!</Typography>}
            </Box>
        </Container>
    );
};

export default CreatePost;
