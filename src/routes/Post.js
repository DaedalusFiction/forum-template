import React, { useEffect, useState } from "react";
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
    Typography,
} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlagIcon from "@mui/icons-material/Flag";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Reply from "../components/Reply";
import InputReply from "../components/InputReply";
import { selectGoogleUser, selectSiteUser } from "../features/user/userSlice";

import { useSelector } from "react-redux";
import Notification from "../components/Notification";
import Breadcrumb from "../components/Breadcrumb";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const Post = () => {
    const params = useParams();
    const siteUser = useSelector(selectSiteUser);
    const googleUser = useSelector(selectGoogleUser);
    const post = useGetPost(params.category, params.forum, params.id);
    const replies = useGetReplies(params.category, params.forum, params.id);
    const [isEditing, setIsEditing] = useState(false);
    const [body, setBody] = useState("");

    const handleBodyChange = (e) => {
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
        const updateTask = await updateDoc(docRef, { body: body });
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
                            {params.category}
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
                                        <Button onClick={handleConfirmEdit}>
                                            Confirm
                                        </Button>
                                    )}
                                    {!isEditing &&
                                        googleUser &&
                                        post.data().authorUID ===
                                            googleUser.uid && (
                                            <EditIcon
                                                style={{ cursor: "pointer" }}
                                                onClick={handleEditIconClick}
                                            />
                                        )}
                                    {googleUser &&
                                        post.data().authorUID ===
                                            googleUser.uid && (
                                            <DeleteIcon
                                                style={{ cursor: "pointer" }}
                                            />
                                        )}
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
