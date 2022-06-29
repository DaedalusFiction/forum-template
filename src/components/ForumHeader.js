import { Box, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const ForumHeader = () => {
    const params = useParams();

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: ".5em",
                alignItems: "center",
            }}
        >
            <Typography
                sx={{
                    fontSize: { xs: "1.5rem", sm: "2rem" },
                    fontWeight: "bold",
                    textTransform: "capitalize",
                }}
            >
                {params.category}
            </Typography>
            {params.category && (
                <>
                    <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                        {">"}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: { xs: "1.5rem", sm: "2rem" },
                            fontWeight: "bold",
                            textTransform: "capitalize",
                        }}
                    >
                        {params.forum}
                    </Typography>
                </>
            )}
        </Box>
    );
};

export default ForumHeader;
