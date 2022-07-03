import React, { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDoc, doc } from "firebase/firestore";
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

const DeleteReplyIcon = ({ params, id }) => {
    const [open, setOpen] = useState(false);
    const handleYes = async () => {
        console.log("first");
        setOpen(false);
        await deleteDoc(
            doc(
                db,
                `forums/${params.category}/${params.forum}/${params.id}/replies/`,
                id
            )
        );
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleNo = () => {
        setOpen(false);
    };
    return (
        <Box>
            <Tooltip title={"Delete"}>
                <DeleteIcon
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

export default DeleteReplyIcon;
