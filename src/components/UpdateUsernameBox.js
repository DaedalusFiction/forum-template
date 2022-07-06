import React, { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    selectGoogleUser,
    selectSiteUser,
    updateSiteUser,
} from "../features/user/userSlice";
import {
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { db } from "../firebase";
import Notification from "../components/Notification";

const Settings = () => {
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const [usernameNotificationOpen, setUsernameNotificationOpen] =
        useState(false);

    const siteUser = useSelector(selectSiteUser);
    const googleUser = useSelector(selectGoogleUser);

    const dispatch = useDispatch();
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        setUsernameError("");
    };
    const verifyUsername = async (e) => {
        if (!isUpdating) {
            setIsUpdating(true);
            return;
        }
        if (username.length < 8 || username.length > 12) {
            setUsernameError("Username must be between 8 and 12 characters");
            return;
        }
        if (username.includes(" ")) {
            setUsernameError("Username must not include spaces");
            return;
        }

        const usersRef = collection(db, "users");
        const usernameQuery = query(
            usersRef,
            where("username", "==", username)
        );
        //check to see if name is taken
        const usernamesSnap = await getDocs(usernameQuery);
        if (usernamesSnap.docs.length > 0) {
            setUsernameError("That username is already taken");
            return;
        }
        const userRef = doc(db, "users", googleUser.uid);
        await updateDoc(userRef, {
            username: username,
        });
        let newSiteUser = JSON.parse(JSON.stringify(siteUser));
        newSiteUser.username = username;
        dispatch(updateSiteUser(newSiteUser));
        setUsernameNotificationOpen(true);
        setUsername("");
        setIsUpdating(false);
    };
    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                    gap: "1em",
                    flexWrap: "wrap",
                }}
            >
                {isUpdating && (
                    <TextField
                        label="Username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                )}
                <Button onClick={verifyUsername}>Update</Button>
            </Box>
            <Notification
                open={usernameNotificationOpen}
                setOpen={setUsernameNotificationOpen}
                message="Username Updated!"
            />
            {usernameError && <Typography>{usernameError}</Typography>}
        </Box>
    );
};
export default Settings;
