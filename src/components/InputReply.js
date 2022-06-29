import React, { useState } from "react";

import { useParams } from "react-router-dom";
import {
    Box,
    Button,
    Divider,
    Grid,
    TextareaAutosize,
    Typography,
} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlagIcon from "@mui/icons-material/Flag";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { selectSiteUser } from "../features/user/userSlice";

import { useSelector } from "react-redux";

const InputReply = () => {
    const [body, setBody] = useState("");
    const siteUser = useSelector(selectSiteUser);
    const params = useParams();

    const handleBodyChange = (e) => {
        setBody(e.target.value);
        console.log(body);
    };
    return (
        <Box sx={{ margin: "3em 0 3em 0" }}>
            {siteUser && (
                <Box>
                    <Divider />
                    <Grid container sx={{ margin: "2em 0" }}>
                        <Grid item xs={12} sm={2}>
                            {siteUser.handle}
                        </Grid>
                        <Grid item xs={12} sm={10}>
                            <TextareaAutosize
                                onChange={handleBodyChange}
                                aria-label="body-reply"
                                minRows={6}
                                placeholder="Write something pleasant..."
                                style={{ width: "100%", padding: "1em" }}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ display: "flex", justifyContent: "end" }}>
                        <Button variant="contained">Reply</Button>
                    </Box>
                </Box>
            )}
            {!siteUser && <Typography>Log in to leave a reply</Typography>}
        </Box>
    );
};

export default InputReply;
