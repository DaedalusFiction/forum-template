import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { doc, setDoc, getDoc } from "firebase/firestore";
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
import { getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";
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
                    email: user.email,
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
            case "Admin":
                setAnchorElUser(null);
                break;
            case "Log in with Google":
                signInWithPopup(auth, provider)
                    .then(async (result) => {
                        // This gives you a Google Access Token. You can use it to access the Google API.

                        const googleUser = {
                            uid: result.user.uid,
                            email: result.user.email,
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
                                lastPosted: Date.now(),
                                admin: false,
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
                        const errorMessage = error.message;
                        console.log(errorMessage);
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
                        <Typography textAlign="center">
                            Log in with Google
                        </Typography>
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
                {googleUser && siteUser && siteUser.admin && (
                    <Link to="admin" onClick={handleMenuClick}>
                        <MenuItem>
                            <Typography
                                textAlign="center"
                                sx={{ color: "var(--fc-primary)" }}
                            >
                                Admin
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
