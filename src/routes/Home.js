import { Box, Container, Typography } from "@mui/material";
import React from "react";

const Home = () => {
    return (
        <Container>
            <Box>
                <Typography variant="h1">The Forums</Typography>
                <Typography sx={{ maxWidth: "75ch", marginBottom: "1em" }}>
                    Welcome to The Forums, the world's greatest forum template!
                    This website exists entirely on the front end, making use of
                    Firebase Cloud Storage to store forum posts and replies. It
                    uses Redux to store user data and OAuth 2.0 to handle
                    authentication and authorization.
                </Typography>
                <Typography sx={{ maxWidth: "75ch" }}>
                    If you would like to know more about how to create your very
                    own message board using this template, or if you would like
                    one built for you, please contact Dave at
                    djs41286@gmail.com.
                </Typography>
            </Box>
        </Container>
    );
};

export default Home;
