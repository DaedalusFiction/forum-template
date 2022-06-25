import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    decrement,
    increment,
    incrementByAmount,
    incrementAsync,
    incrementIfOdd,
    selectCount,
} from "../features/counter/counterSlice";
import {
    updateGoogleUser,
    selectGoogleUser,
    selectSiteUser,
    selectHandle,
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
import { auth, provider } from "../firebase";

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
                    .then((result) => {
                        // This gives you a Google Access Token. You can use it to access the Google API.
                        const credential =
                            GoogleAuthProvider.credentialFromResult(result);
                        const token = credential.accessToken;
                        // The signed-in user info.
                        const googleUser = {
                            id: result.user.uid,
                            name: result.user.displayName,
                            photoURL: result.user.photoURL,
                        };
                        dispatch(updateGoogleUser(googleUser));
                        // ...
                    })
                    .catch((error) => {
                        // Handle Errors here.
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // The email of the user's account used.
                        const email = error.customData.email;
                        // The AuthCredential type that was used.
                        const credential =
                            GoogleAuthProvider.credentialFromError(error);
                        // ...
                    });
                setAnchorElUser(null);
                break;
            case "Log Out":
                auth.signOut().then(dispatch(updateGoogleUser(null)));
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
                    <Avatar>{handle.charAt(0)}</Avatar>
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
