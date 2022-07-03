import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

import {
    updateGoogleUser,
    selectGoogleUser,
    selectSiteUser,
    updateSiteUser,
} from "../features/user/userSlice";
import {
    Avatar,
    Box,
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

const Profile = () => {
    const googleUser = useSelector(selectGoogleUser);
    const siteUser = useSelector(selectSiteUser);
    const dispatch = useDispatch();

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                const docRef = doc(db, "users", uid);
                const userSnap = await getDoc(docRef);
                dispatch(updateSiteUser(userSnap.data()));
                const googleUser = {
                    uid: user.uid,
                    name: user.displayName,
                    photoURL: user.photoURL,
                };
                dispatch(updateGoogleUser(googleUser));

                // ...
            } else {
                dispatch(updateGoogleUser(null));
                dispatch(updateSiteUser(null));
                // ...
            }
        });
        return () => {};
    }, [dispatch]);

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
                                username: "Anonymous",
                                avatar: "rocket",
                                lastPosted: Date.now(),
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
                    <Avatar>
                        {siteUser
                            ? siteUser.username.charAt(0).toUpperCase()
                            : "A"}
                    </Avatar>
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
                    <Link to="settings" onClick={handleMenuClick}>
                        <MenuItem>
                            <Typography
                                textAlign="center"
                                sx={{ color: "var(--fc-primary)" }}
                            >
                                Settings
                            </Typography>
                        </MenuItem>
                    </Link>
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
