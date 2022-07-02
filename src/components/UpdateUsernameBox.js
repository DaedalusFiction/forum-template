import React, { useState } from "react";
import {
    Avatar,
    Container,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
    TextField,
} from "@mui/material";
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
    const [usernameTakenError, setUsernameTakenError] = useState(false);

    const [usernameNotificationOpen, setUsernameNotificationOpen] =
        useState(false);

    const siteUser = useSelector(selectSiteUser);
    const googleUser = useSelector(selectGoogleUser);

    const dispatch = useDispatch();
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        setUsernameTakenError(false);
    };
    const verifyUsername = async (e) => {
        if (username.length < 8) {
            console.log("must be 8 characters or longer");
            return;
        }
        if (username.includes(" ")) {
            console.log("don't use spaces");
            return;
        }

        const usersRef = collection(db, "users");
        const usernameQuery = query(
            usersRef,
            where("username", "==", username)
        );
        const usernamesSnap = await getDocs(usernameQuery);
        if (usernamesSnap.docs.length > 0) {
            setUsernameTakenError(true);
            return;
        }
        const userRef = doc(db, "users", googleUser.uid);
        const uploadTaskTwo = await updateDoc(userRef, {
            username: username,
        });
        let newSiteUser = JSON.parse(JSON.stringify(siteUser));
        newSiteUser.username = username;
        dispatch(updateSiteUser(newSiteUser));
        setUsernameNotificationOpen(true);
        setUsername("");
        console.log(username);
    };
    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1em",
                }}
            >
                <TextField
                    fullWidth
                    label="Username"
                    value={username}
                    onChange={handleUsernameChange}
                    error={usernameTakenError}
                />
                <Button variant="contained" onClick={verifyUsername}>
                    Update
                </Button>
                <Notification
                    open={usernameNotificationOpen}
                    setOpen={setUsernameNotificationOpen}
                    message="Username Updated!"
                />
            </Box>
            {usernameTakenError && (
                <Typography>That username is already taken</Typography>
            )}
        </Box>
    );
};
export default Settings;
