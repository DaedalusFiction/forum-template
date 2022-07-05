import React, { useState } from "react";

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
import ReplyIcon from "@mui/icons-material/Reply";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlagIcon from "@mui/icons-material/Flag";
import EditIcon from "@mui/icons-material/Edit";

import FlagAsInappropriateIcon from "../components/FlagAsInappropriateIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { useDispatch, useSelector } from "react-redux";
import {
    selectGoogleUser,
    selectSiteUser,
    updateCounter,
} from "../features/user/userSlice";
import { doc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import DeleteReplyIcon from "./DeleteReplyIcon";

const Reply = ({ reply }) => {
    const params = useParams();
    const siteUser = useSelector(selectSiteUser);
    const googleUser = useSelector(selectGoogleUser);
    const [isEditing, setIsEditing] = useState(false);
    const [body, setBody] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const handleBodyChange = (e) => {
        if (e.target.value.length > 5000) {
            return;
        }
        setBody(e.target.value);
    };

    const handleEditIconClick = (e) => {
        setBody(reply.data().body);
        setIsEditing(true);
    };

    const handleCloseEdit = () => {
        setIsEditing(false);
    };

    const handleConfirmEdit = async () => {
        const docRef = doc(
            db,
            `forums/${params.category}/${params.forum}/${params.id}/replies/${reply.id}`
        );
        const updateTask = await updateDoc(docRef, {
            body: body,
            lastUpdated: Date.now(),
        });
        setIsEditing(false);
        dispatch(updateCounter());
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
                    {reply.data().isEditable && isEditing ? (
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
                        </Box>
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
                            <>
                                <Button onClick={handleConfirmEdit}>
                                    Confirm
                                </Button>
                                <Button onClick={handleCloseEdit}>Close</Button>
                            </>
                        )}
                        {googleUser &&
                            reply.data().authorUID !== googleUser.uid && (
                                <FlagAsInappropriateIcon
                                    id={reply.id}
                                    flaggedBy={siteUser.username}
                                    forum={params.forum}
                                    body={reply.data().body}
                                    isReply={true}
                                />
                            )}
                        {!isEditing &&
                            googleUser &&
                            reply.data().authorUID === googleUser.uid && (
                                <Tooltip title="Edit">
                                    <EditIcon
                                        style={{ cursor: "pointer" }}
                                        onClick={handleEditIconClick}
                                    />
                                </Tooltip>
                            )}
                        {googleUser &&
                            reply.data().authorUID === googleUser.uid && (
                                <DeleteReplyIcon
                                    id={reply.id}
                                    category={params.category}
                                    forum={params.forum}
                                    parentId={params.id}
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
                        {reply.data().lastUpdated === reply.data().createdAt
                            ? "Created: "
                            : "Edited: "}
                        {reply.data().lastUpdated &&
                            new Date(
                                reply.data().lastUpdated
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
    );
};

export default Reply;
