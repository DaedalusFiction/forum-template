import { Box, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ForumHeader from "../components/ForumHeader";

const Forum = () => {
    const params = useParams();
    useEffect(() => {
        console.log(params);
    }, [params]);
    return (
        <Container maxWidth="md">
            <ForumHeader />
        </Container>
    );
};

export default Forum;
