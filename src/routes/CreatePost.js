import React, { useState } from "react";

import { collection, addDoc } from "firebase/firestore";

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
import { selectGoogleUser, selectSiteUser } from "../features/user/userSlice";

import { useSelector } from "react-redux";
import { db } from "../firebase";
import Breadcrumb from "../components/Breadcrumb";

const CreatePost = () => {
    const [topic, setTopic] = useState("");
    const [body, setBody] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const siteUser = useSelector(selectSiteUser);
    const googleUser = useSelector(selectGoogleUser);
    const params = useParams();
    const navigate = useNavigate();

    const handleBodyChange = (e) => {
        if (e.target.value.length > 5000) {
            return;
        }
        setBody(e.target.value);
    };
    const handleTopicChange = (e) => {
        if (e.target.value.length > 50) {
            return;
        }
        setTopic(e.target.value);
    };

    const handleSubmitPost = async (e) => {
        e.preventDefault();
        const currentTime = Date.now();
        if (currentTime - siteUser.lastPosted < 15 * 1000) {
            setError(
                "You're posting too often. Please try again in a few seconds."
            );
            return;
        }
        if (!submitted) {
            const folderRef = collection(
                db,
                `forums/${params.category}/${params.forum}`
            );
            const docRef = await addDoc(folderRef, {
                authorUsername: siteUser.username,
                authorUID: googleUser.uid,
                topic: topic,
                body: body,
                replies: 0,
                createdAt: Date.now(),
                lastUpdated: Date.now(),
                latestReply: Date.now(),
                isEditable: true,
            });

            navigate(`/forums/${params.category}/${params.forum}/${docRef.id}`);
        }
        setSubmitted(true);
        setError("");
    };
    return (
        <Container>
            <Box>
                <Breadcrumb />
                <Typography variant="h1" sx={{ fontSize: "3rem" }}>
                    Create a Post
                </Typography>
                {siteUser && !submitted && (
                    <Box>
                        <Divider />
                        <Grid container sx={{ margin: "2em 0" }}>
                            <Grid item xs={12} sm={2}>
                                {siteUser.username}
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
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography>{error}</Typography>
                                    <Typography
                                        sx={{
                                            color: "var(--fc-primary-muted)",
                                        }}
                                    >
                                        {body.length}
                                        {" / "}5000
                                    </Typography>
                                </Box>
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
