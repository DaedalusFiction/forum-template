import { Button } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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
                console.log("testing!");
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
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
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                // The email of the user's account used.
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };
    return <Button onClick={handleLogin}>Login</Button>;
};

export default LoginButton;
