import React, { useState } from "react";

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
import EditIcon from "@mui/icons-material/Edit";

import DeleteIcon from "@mui/icons-material/Delete";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { useSelector } from "react-redux";
import { selectGoogleUser, selectSiteUser } from "../features/user/userSlice";
import { doc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../firebase";

const Reply = ({ reply }) => {
    const params = useParams();
    const siteUser = useSelector(selectSiteUser);
    const googleUser = useSelector(selectGoogleUser);
    const [isEditing, setIsEditing] = useState(false);
    const [body, setBody] = useState("");

    const handleBodyChange = (e) => {
        setBody(e.target.value);
    };

    const handleEditIconClick = (e) => {
        setBody(reply.data().body);
        setIsEditing(true);
    };

    const handleConfirmEdit = async () => {
        console.log("test");
        const docRef = doc(
            db,
            `forums/${params.category}/${params.forum}/${params.id}/replies/${reply.id}`
        );
        const updateTask = await updateDoc(docRef, { body: body });
        setIsEditing(false);
    };
    return (
        <Box sx={{ margin: "3em 0 3em 0" }}>
            <Divider />
            <Grid container sx={{ margin: "2em 0" }}>
                <Grid item xs={12} sm={2.5}>
                    <Typography sx={{ fontWeight: "bold" }}>
                        {reply.data().authorUsername}
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
                            {reply.data().body}
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
                            <Button onClick={handleConfirmEdit}>Confirm</Button>
                        )}
                        {!isEditing &&
                            googleUser &&
                            reply.data().authorUID === googleUser.uid && (
                                <EditIcon
                                    style={{ cursor: "pointer" }}
                                    onClick={handleEditIconClick}
                                />
                            )}
                        {googleUser &&
                            reply.data().authorUID === googleUser.uid && (
                                <DeleteIcon style={{ cursor: "pointer" }} />
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
                        {reply.data().createdAt &&
                            new Date(reply.data().createdAt).toLocaleDateString(
                                "en-us",
                                {
                                    weekday: "short",
                                    month: "short",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                }
                            )}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Reply;
