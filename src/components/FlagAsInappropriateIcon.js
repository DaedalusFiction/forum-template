import React, { useState } from "react";

import FlagIcon from "@mui/icons-material/Flag";
import { addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tooltip,
} from "@mui/material";

const FlagAsInappropriateIcon = ({ forum, id, flaggedBy }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleYes = async () => {
        setOpen(false);
        const inappropriatePost = {
            flaggedBy: flaggedBy,
            forum: forum,
            flaggedAt: Date.now(),
        };
        const docRef = await setDoc(
            doc(db, "flaggedPosts", id),
            inappropriatePost
        );
    };

    const handleNo = () => {
        setOpen(false);
    };

    return (
        <Box>
            <Tooltip title={"Flag as Inappropriate"}>
                <FlagIcon
                    onClick={handleClickOpen}
                    style={{ cursor: "pointer" }}
                />
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleNo}
                aria-labelledby="delete-post"
                aria-describedby="delete-post-description"
            >
                <DialogTitle id="delete-post">
                    {"Delete this post permanently?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-post-description">
                        This action cannot be undone
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleNo}>No</Button>
                    <Button onClick={handleYes}>Yes</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default FlagAsInappropriateIcon;
