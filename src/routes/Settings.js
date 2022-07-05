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
    Divider,
    Grid,
} from "@mui/material";

import Notification from "../components/Notification";
import UpdateUsernameBox from "../components/UpdateUsernameBox";
import Alert from "../components/Alert";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { selectGoogleUser, selectSiteUser } from "../features/user/userSlice";
import LoginButton from "../components/LoginButton";

const Settings = () => {
    const googleUser = useSelector(selectGoogleUser);
    const siteUser = useSelector(selectSiteUser);
    const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

    const handleYes = async () => {
        // Delete the file
        console.log("worked");
        setDeleteAlertOpen(false);
        // await deleteDoc(doc(db, "users", googleUser.uid));
    };
    return (
        <Container>
            <Typography variant="h1">Settings</Typography>
            <Container maxWidth="md">
                <Typography
                    variant="h5"
                    sx={{ fontSize: ".75rem", marginTop: "2rem" }}
                >
                    Account Settings
                </Typography>
                <Divider sx={{ margin: ".25rem 0 1rem 0" }} />

                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            Account Email
                        </Typography>
                        <Typography sx={{ color: "var(--fc-primary-muted)" }}>
                            {googleUser && googleUser.email}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        sx={{ display: "flex", justifyContent: "end" }}
                    >
                        <LoginButton />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            variant="h5"
                            sx={{ fontSize: ".75rem", marginTop: "2rem" }}
                        >
                            Profile Settings
                        </Typography>
                        <Divider sx={{ margin: ".25rem 0 1rem 0" }} />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            Username
                        </Typography>
                        <Typography sx={{ color: "var(--fc-primary-muted)" }}>
                            {siteUser && siteUser.username}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        sx={{ display: "flex", justifyContent: "end" }}
                    >
                        <UpdateUsernameBox />
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
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
