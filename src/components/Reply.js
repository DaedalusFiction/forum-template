import React from "react";

import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlagIcon from "@mui/icons-material/Flag";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

const Reply = ({ reply }) => {
    return (
        <Box sx={{ margin: "3em 0 3em 0" }}>
            <Divider />
            <Grid container spacing={2} sx={{ margin: "2em 0" }}>
                <Grid item xs={12} sm={2}>
                    <Typography sx={{ fontWeight: "bold" }}>
                        {reply.data().author}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={10}>
                    <Typography sx={{ marginBottom: "2em", maxWidth: "75ch" }}>
                        {reply.data().body}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            gap: ".5em",
                            justifyContent: "end",
                            marginBottom: "1em",
                        }}
                    >
                        <FormatQuoteIcon />
                        <ReplyIcon />
                        <FavoriteIcon />
                        <FlagIcon />
                    </Box>
                    <Divider sx={{ marginBottom: "1em" }} />
                    <Typography
                        sx={{
                            color: "var(--fc-primary-muted)",
                            fontSize: ".75rem",
                        }}
                    >
                        Last updated:{" "}
                        {reply.data().createdAt &&
                            new Date(reply.data().createdAt).toLocaleDateString(
                                "en-us",
                                {
                                    weekday: "short",
                                    month: "short",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                }
                            )}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Reply;
