import React, { useState } from "react";
import useGetPost from "../hooks/useGetPost";
import useGetReplies from "../hooks/useGetReplies";
import { useParams } from "react-router-dom";
import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    TextareaAutosize,
    Tooltip,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Reply from "../components/Reply";
import InputReply from "../components/InputReply";
import FlagAsInappropriateIcon from "../components/FlagAsInappropriateIcon";
import {
    selectCounter,
    selectGoogleUser,
    selectSiteUser,
    updateCounter,
} from "../features/user/userSlice";

import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../components/Breadcrumb";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const Post = () => {
    const params = useParams();
    const siteUser = useSelector(selectSiteUser);
    const counter = useSelector(selectCounter);
    const googleUser = useSelector(selectGoogleUser);
    const post = useGetPost(params.category, params.forum, params.id, counter);
    const dispatch = useDispatch();
    const replies = useGetReplies(
        params.category,
        params.forum,
        params.id,
        counter
    );
    const [isEditing, setIsEditing] = useState(false);
    const [body, setBody] = useState("");

    const handleBodyChange = (e) => {
        if (e.target.value.length > 5000) {
            return;
        }
        setBody(e.target.value);
    };

    const handleEditIconClick = (e) => {
        setBody(post.data().body);
        setIsEditing(true);
    };

    const handleConfirmEdit = async () => {
        console.log("test");

        const docRef = doc(
            db,
            `forums/${params.category}/${params.forum}/${params.id}`
        );
        await updateDoc(docRef, {
            body: body,
            lastUpdated: Date.now(),
        }).then(() => {
            setIsEditing(false);
            dispatch(updateCounter());
        });
    };

    const handleCloseEdit = () => {
        setIsEditing(false);
    };

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
                            {params.forum}
                        </Typography>
                        <Divider />
                        <Grid container sx={{ margin: "2em 0" }}>
                            <Grid item xs={12} sm={2.5}>
                                <Typography sx={{ fontWeight: "bold" }}>
                                    {post.data().authorUsername}:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={9.5}>
                                {isEditing ? (
                                    <Box>
                                        <TextareaAutosize
                                            value={body}
                                            onChange={handleBodyChange}
                                            aria-label="body-reply"
                                            minRows={6}
                                            style={{
                                                width: "100%",
                                                padding: "1em",
                                                whiteSpace: "pre-wrap",
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "end",
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: "var(--fc-primary-muted)",
                                                }}
                                            >
                                                {body.length}
                                                {" / "}5000
                                            </Typography>
                                        </Box>
                                    </Box>
                                ) : (
                                    <Typography
                                        sx={{
                                            marginBottom: "2em",
                                            maxWidth: "75ch",
                                            whiteSpace: "pre-wrap",
                                        }}
                                    >
                                        {post.data().body}
                                    </Typography>
                                )}
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: ".5em",
                                        justifyContent: "end",
                                        marginBottom: "1em",
                                    }}
                                >
                                    {isEditing && (
                                        <>
                                            <Button onClick={handleConfirmEdit}>
                                                Confirm
                                            </Button>
                                            <Button onClick={handleCloseEdit}>
                                                Close
                                            </Button>
                                        </>
                                    )}
                                    {googleUser &&
                                        post.data().authorUID !==
                                            googleUser.uid && (
                                            <FlagAsInappropriateIcon
                                                id={post.id}
                                                flaggedBy={siteUser.username}
                                                forum={params.forum}
                                                body={post.data().body}
                                                isReply={false}
                                            />
                                        )}
                                    {!isEditing &&
                                        googleUser &&
                                        post.data().isEditable &&
                                        post.data().authorUID ===
                                            googleUser.uid && (
                                            <Tooltip title="Edit">
                                                <EditIcon
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={
                                                        handleEditIconClick
                                                    }
                                                />
                                            </Tooltip>
                                        )}
                                </Box>
                                <Divider sx={{ marginBottom: "1em" }} />
                                <Typography
                                    sx={{
                                        color: "var(--fc-primary-muted)",
                                        fontSize: ".75rem",
                                    }}
                                >
                                    {post.data().lastUpdated ===
                                    post.data().createdAt
                                        ? "Created: "
                                        : "Edited: "}
                                    {post.data().lastUpdated &&
                                        new Date(
                                            post.data().lastUpdated
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
