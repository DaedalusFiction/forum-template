import React, { useState } from "react";

import {
    collection,
    addDoc,
    doc,
    updateDoc,
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
import {
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

    const dispatch = useDispatch();
    const params = useParams();

    const handleBodyChange = (e) => {
        if (e.target.value.length > 5000) {
            return;
        }
        setBody(e.target.value);
    };

    const handleCreateReply = async (e) => {
        e.preventDefault();

        //make sure user can't post more than once every fifteen seconds
        const currentTime = Date.now();
        if (currentTime - siteUser.lastPosted < 15 * 1000) {
            setError(
                "You're posting too often. Please try again in a few seconds."
            );
            return;
        }

        if (body !== "") {
            const collectionRef = collection(
                db,
                `forums/${params.category}/${params.forum}/${params.id}/replies`
            );
            const parentPostRef = doc(
                db,
                `forums/${params.category}/${params.forum}`,
                params.id
            );
            const userRef = doc(db, "users", googleUser.uid);
            let newSiteUser = JSON.parse(JSON.stringify(siteUser));
            newSiteUser.lastPosted = currentTime;

            await Promise.all([
                addDoc(collectionRef, {
                    authorUsername: siteUser.username,
                    authorUID: googleUser.uid,
                    body: body,
                    createdAt: currentTime,
                    lastUpdated: Date.now(),
                    isEditable: true,
                }),
                updateDoc(parentPostRef, {
                    replies: increment(1),
                    latestReply: Date.now(),
                }),
                updateDoc(userRef, {
                    lastPosted: currentTime,
                }),
            ]).then(() => {
                dispatch(updateSiteUser(newSiteUser));
                dispatch(updateCounter());
                setBody("");
                setOpen(true);
                setError("");
            });
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
