import React, { useState } from "react";

import FlagIcon from "@mui/icons-material/Flag";
import { doc, setDoc } from "firebase/firestore";
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
import { useParams } from "react-router-dom";

const FlagAsInappropriateIcon = ({ forum, id, body, flaggedBy, isReply }) => {
    const params = useParams();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleYes = async () => {
        setOpen(false);
        const inappropriatePost = {
            flaggedBy: flaggedBy,
            forum: forum,
            body: body,
            flaggedAt: Date.now(),
            location: `forums/` + Object.values(params).join("/"),
            isReply: isReply,
        };
        await setDoc(doc(db, "flaggedPosts", id), inappropriatePost);
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
                aria-labelledby="flag-post"
                aria-describedby="flag-post-description"
            >
                <DialogTitle id="flag-post">
                    {"Flag this post as inappropriate?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="flag-post-description">
                        A post or comment may be considered inappropriate if:
                        <br />
                        1. It contains crude or offensive language.
                        <br />
                        2. It contains personal information about you or someone
                        else
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
