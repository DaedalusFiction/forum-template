import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";

import {
    updateGoogleUser,
    selectGoogleUser,
    selectSiteUser,
    selectHandle,
    updateSiteUser,
} from "../features/user/userSlice";
import {
    Avatar,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
} from "@mui/material";
import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "../firebase";

const settings = ["Settings", "Logout"];

const Profile = () => {
    const googleUser = useSelector(selectGoogleUser);
    const siteUser = useSelector(selectSiteUser);
    const handle = useSelector(selectHandle);
    const dispatch = useDispatch();

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    // useEffect(() => {
    //     const auth = getAuth();
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             // User is signed in, see docs for a list of available properties
    //             // https://firebase.google.com/docs/reference/js/firebase.User
    //             const uid = user.uid;
    //             // ...
    //         } else {
    //             // User is signed out
    //             // ...
    //         }
    //     });
    //     return () => {};
    // }, []);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenuClick = (e) => {
        switch (e.target.innerHTML) {
            case "Settings":
                setAnchorElUser(null);
                break;
            case "Log In":
                signInWithPopup(auth, provider)
                    .then(async (result) => {
                        console.log("testing!");
                        // This gives you a Google Access Token. You can use it to access the Google API.
                        const credential =
                            GoogleAuthProvider.credentialFromResult(result);
                        const token = credential.accessToken;
                        const googleUser = {
                            uid: result.user.uid,
                            name: result.user.displayName,
                            photoURL: result.user.photoURL,
                        };
                        const userSnap = await getDoc(
                            doc(db, "users", result.user.uid)
                        );
                        if (userSnap.exists()) {
                            dispatch(updateGoogleUser(googleUser));
                            dispatch(updateSiteUser(userSnap.data()));
                        } else {
                            //new user is created
                            const siteUser = {
                                handle: "Unknown",
                                avatar: "rocket",
                            };
                            const docRef = await setDoc(
                                doc(db, "users", googleUser.uid),
                                siteUser
                            );
                            dispatch(updateGoogleUser(googleUser));
                            dispatch(updateSiteUser(siteUser));
                        }
                        // ...
                    })
                    .catch((error) => {
                        // Handle Errors here.
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorMessage);
                        // The email of the user's account used.
                        // The AuthCredential type that was used.
                        const credential =
                            GoogleAuthProvider.credentialFromError(error);
                        // ...
                    });
                setAnchorElUser(null);
                break;
            case "Log Out":
                auth.signOut().then(dispatch(updateGoogleUser(null)));
                dispatch(updateSiteUser(null));
                setAnchorElUser(null);
                break;
            default:
                return;
        }
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar>{siteUser ? siteUser.avatar : "A"}</Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {!googleUser && (
                    <MenuItem onClick={handleMenuClick}>
                        <Typography textAlign="center">Log In</Typography>
                    </MenuItem>
                )}
                {googleUser && (
                    <MenuItem onClick={handleMenuClick}>
                        <Typography textAlign="center">Settings</Typography>
                    </MenuItem>
                )}
                {googleUser && (
                    <MenuItem onClick={handleMenuClick}>
                        <Typography textAlign="center">Log Out</Typography>
                    </MenuItem>
                )}
            </Menu>
        </Box>
    );
};

export default Profile;
