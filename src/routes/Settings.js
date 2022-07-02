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

const Settings = () => {
    return (
        <Container>
            <Typography variant="h1">Profile Settings</Typography>
            <Container maxWidth="sm">
                <UpdateUsernameBox />
            </Container>
        </Container>
    );
};
export default Settings;
