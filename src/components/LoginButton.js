import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React from "react";
import { useDispatch } from "react-redux";
import { updateGoogleUser, updateSiteUser } from "../features/user/userSlice";
import { auth, db, provider } from "../firebase";

const LoginButton = () => {
    const dispatch = useDispatch();
    const handleLogin = () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
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
                const errorMessage = error.message;
                console.log(errorMessage);
                // The email of the user's account used.
                // The AuthCredential type that was used.
            });
    };
    return <Button onClick={handleLogin}>Log in with Google</Button>;
};

export default LoginButton;
