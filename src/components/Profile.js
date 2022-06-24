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
    updateCurrentUser,
    selectUser,
    selectSpotifyToken,
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
    const [currentUser, setCurrentUser] = useState(null);
    const count = useSelector(selectCount);
    const user = useSelector(selectUser);
    const spotifyToken = useSelector(selectSpotifyToken);
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState("2");

    const incrementValue = Number(incrementAmount) || 0;

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                setCurrentUser(user);
                // ...
            } else {
                // User is signed out
                // ...
            }
        });
        return () => {};
    }, []);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
        // console.log(user);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenuClick = (e) => {
        switch (e.target.innerHTML) {
            case "Settings":
                console.log(spotifyToken);
                setAnchorElUser(null);
                break;
            case "Logout":
                auth.signOut().then(dispatch(updateCurrentUser(null)));
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
                    <Avatar
                        alt={user ? user.name : ""}
                        src={
                            user ? user.photoURL : "/static/images/avatar/2.jpg"
                        }
                    />
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
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleMenuClick}>
                        <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default Profile;
