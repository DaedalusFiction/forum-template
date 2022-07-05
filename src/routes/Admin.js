import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { useSelector } from "react-redux";
import { selectSiteUser } from "../features/user/userSlice";
import { db } from "../firebase";
import useGetFlaggedPosts from "../hooks/useGetFlaggedPosts";

const Admin = () => {
    const [posts] = useGetFlaggedPosts();
    const siteUser = useSelector(selectSiteUser);

    const handleDelete = async (location, isReply, id) => {
        if (isReply) {
            const myPath = `${location}/replies`;
            console.log(myPath, id);

            Promise.all([
                deleteDoc(doc(db, myPath, id)),
                deleteDoc(doc(db, "flaggedPosts", id)),
            ]);
        } else {
            let myPath = location.split("/");
            myPath = myPath.splice(0, myPath.length - 1);
            myPath = myPath.join("/");
            console.log(myPath, id);
            Promise.all([
                updateDoc(doc(db, myPath, id), {
                    isEditable: false,
                    body: "[Post removed by moderator]",
                }),
                deleteDoc(doc(db, "flaggedPosts", id)),
            ]);
        }
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h1">Admin</Typography>
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
