import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectGoogleUser } from "../features/user/userSlice";
import { db } from "../firebase";

export default function Alert({ handleYes, text, open, setOpen }) {
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleNo = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button color="secondary" onClick={handleClickOpen}>
                {text}
            </Button>
            <Dialog
                open={open}
                onClose={handleNo}
                aria-labelledby="delete-account"
                aria-describedby="delete-account-description"
            >
                <DialogTitle id="delete-account">
                    {"Delete this account permanently?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-account-description">
                        This action cannot be undone
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleNo}>No</Button>
                    <Button onClick={handleYes}>Yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
