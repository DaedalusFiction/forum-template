import { CleaningServices } from "@mui/icons-material";
import { Breadcrumbs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Breadcrumb = () => {
    const params = useParams();
    const base = window.location.pathname.split("/")[1];
    const values = Object.values(params);

    return (
        <Breadcrumbs aria-label="breadcrumb" sx={{ marginTop: ".5em" }}>
            <Typography sx={{ textTransform: "capitalize" }}>
                <Link to={"/" + base}>{base}</Link>
            </Typography>
            {values &&
                values.map((value, index) => {
                    return (
                        <Typography
                            key={index}
                            sx={{ textTransform: "capitalize" }}
                        >
                            <Link
                                key={value}
                                to={
                                    "/forums/" +
                                    values.slice(0, index + 1).join("/")
                                }
                            >
                                {value}
                            </Link>
                        </Typography>
                    );
                })}
        </Breadcrumbs>
    );
};

export default Breadcrumb;
