import React, { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDoc, doc, increment, updateDoc } from "firebase/firestore";
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
import { useDispatch } from "react-redux";
import { updateCounter } from "../features/user/userSlice";

const DeleteReplyIcon = ({ category, forum, parentId, id }) => {
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const handleYes = async () => {
        setOpen(false);
        await Promise.all([
            deleteDoc(
                doc(db, `forums/${category}/${forum}/${parentId}/replies/`, id)
            ),
            updateDoc(doc(db, `forums/${category}/${forum}`, parentId), {
                replies: increment(-1),
            }),
        ]).then(() => {
            dispatch(updateCounter());
        });
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
