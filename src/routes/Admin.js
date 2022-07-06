import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { deleteDoc, doc, increment, updateDoc } from "firebase/firestore";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectCounter,
    selectSiteUser,
    updateCounter,
} from "../features/user/userSlice";
import { db } from "../firebase";
import useGetFlaggedPosts from "../hooks/useGetFlaggedPosts";

const Admin = () => {
    const siteUser = useSelector(selectSiteUser);
    const dispatch = useDispatch();
    const counter = useSelector(selectCounter);
    const [posts] = useGetFlaggedPosts(counter);

    const handleDelete = async (location, isReply, id) => {
        if (isReply) {
            const myPath = `${location}/replies`;
            const parentArray = location.split("/");
            const parentId = parentArray[parentArray.length - 1];
            const parentLocation = parentArray
                .splice(0, parentArray.length - 1)
                .join("/");
            await Promise.all([
                deleteDoc(doc(db, myPath, id)),
                deleteDoc(doc(db, "flaggedPosts", id)),
                updateDoc(doc(db, parentLocation, parentId), {
                    replies: increment(-1),
                }),
            ]);
        } else {
            let myPath = location.split("/");
            myPath = myPath.splice(0, myPath.length - 1);
            myPath = myPath.join("/");
            await Promise.all([
                updateDoc(doc(db, myPath, id), {
                    isEditable: false,
                    body: "[Post removed by moderator]",
                    topic: "[Post removed by moderator]",
                }),
                deleteDoc(doc(db, "flaggedPosts", id)),
            ]);
        }
        dispatch(updateCounter());
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h1">Admin</Typography>
            {siteUser && siteUser.admin === true ? (
                <Typography
                    variant="h5"
                    sx={{
                        fontSize: "1.25rem",
                        marginTop: "2rem",
                        fontWeight: "bold",
                    }}
                >
                    Flagged Posts
                </Typography>
            ) : (
                <Typography>
                    You do not have administrative privileges
                </Typography>
            )}
            <Divider />
            {siteUser &&
                siteUser.admin === true &&
                posts &&
                posts.map((post, index) => {
                    return (
                        <Box
                            key={index}
                            sx={{
                                margin: "1em 0",
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box>
                                <Typography>Post ID: {post.id}</Typography>
                                <Typography>
                                    Flagged By: {post.data().flaggedBy}
                                </Typography>
                                <Typography>
                                    Body: {post.data().body}
                                </Typography>
                            </Box>
                            <Button
                                onClick={() =>
                                    handleDelete(
                                        post.data().location,
                                        post.data().isReply,
                                        post.id
                                    )
                                }
                            >
                                Delete
                            </Button>
                        </Box>
                    );
                })}
        </Container>
    );
};

export default Admin;
