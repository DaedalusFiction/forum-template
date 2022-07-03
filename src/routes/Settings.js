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

import Notification from "../components/Notification";
import UpdateUsernameBox from "../components/UpdateUsernameBox";
import Alert from "../components/Alert";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { selectGoogleUser } from "../features/user/userSlice";

const Settings = () => {
    const googleUser = useSelector(selectGoogleUser);
    const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

    const handleYes = async () => {
        // Delete the file
        console.log("worked");
        setDeleteAlertOpen(false);
        // await deleteDoc(doc(db, "users", googleUser.uid));
    };
    return (
        <Container>
            <Typography variant="h1">Profile Settings</Typography>
            <Container maxWidth="xs">
                <UpdateUsernameBox />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "end",
                        margin: ".5em 0",
                    }}
                >
                    <Alert
                        text="Delete Account"
                        handleYes={handleYes}
                        open={deleteAlertOpen}
                        setOpen={setDeleteAlertOpen}
                    />
                </Box>
            </Container>
        </Container>
    );
};
export default Settings;
