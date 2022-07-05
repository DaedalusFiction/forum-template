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
    updateDoc,
    FieldValue,
    increment,
} from "firebase/firestore";

import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Divider,
    Grid,
    TextareaAutosize,
    Typography,
} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlagIcon from "@mui/icons-material/Flag";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import {
    selectCounter,
    selectGoogleUser,
    selectSiteUser,
    updateCounter,
    updateSiteUser,
} from "../features/user/userSlice";

import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase";
import Notification from "./Notification";

const InputReply = () => {
    const [open, setOpen] = useState(false);
    const [body, setBody] = useState("");
    const [error, setError] = useState("");
    const siteUser = useSelector(selectSiteUser);
    const googleUser = useSelector(selectGoogleUser);

    const counter = useSelector(selectCounter);

    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const handleBodyChange = (e) => {
        if (e.target.value.length > 5000) {
            return;
        }
        setBody(e.target.value);
    };

    const handleCreateReply = async (e) => {
        e.preventDefault();
        const collectionRef = collection(
            db,
            `forums/${params.category}/${params.forum}/${params.id}/replies`
        );

        //make sure user can't post more than once every fifteen seconds
        const currentTime = Date.now();
        if (currentTime - siteUser.lastPosted < 15 * 1000) {
            setError(
                "You're posting too often. Please try again in a few seconds."
            );
            return;
        }
        if (body !== "") {
            const uploadTask = await addDoc(collectionRef, {
                authorUsername: siteUser.username,
                authorUID: googleUser.uid,
                body: body,
                createdAt: currentTime,
                lastUpdated: Date.now(),
                isEditable: true,
            });
            const parentPostRef = doc(
                db,
                `forums/${params.category}/${params.forum}`,
                params.id
            );
            const updateParemtPostTask = await updateDoc(parentPostRef, {
                replies: increment(1),
            });
            const userRef = doc(db, "users", googleUser.uid);
            const uploadTaskTwo = await updateDoc(userRef, {
                lastPosted: currentTime,
            });
            let newSiteUser = JSON.parse(JSON.stringify(siteUser));
            newSiteUser.lastPosted = currentTime;
            dispatch(updateSiteUser(newSiteUser));
            dispatch(updateCounter());
            setBody("");
            setOpen(true);
            setError("");
        }
    };
    return (
        <Box sx={{ margin: "3em 0" }}>
            {siteUser && (
                <Box>
                    <Divider />
                    <Grid container sx={{ margin: "2em 0" }}>
                        <Grid item xs={12} sm={2}>
                            {siteUser.username}
                        </Grid>
                        <Grid item xs={12} sm={10}>
                            <TextareaAutosize
                                value={body}
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
                        <Button variant="contained" onClick={handleCreateReply}>
                            Reply
                        </Button>
                    </Box>
                </Box>
            )}
            {!siteUser && <Typography>Log in to leave a reply</Typography>}
            <Notification
                open={open}
                setOpen={setOpen}
                message="Reply posted"
            />
        </Box>
    );
};

export default InputReply;
