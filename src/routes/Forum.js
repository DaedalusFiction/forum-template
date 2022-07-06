import { Box, Button, Container, Grid, Grow, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import PostPreview from "../components/PostPreview";
import useGetPosts from "../hooks/useGetPosts";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { useSelector } from "react-redux";
import { selectCounter } from "../features/user/userSlice";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

const Forum = () => {
    const params = useParams();
    const [isHovering, setIsHovering] = useState(false);

    const counter = useSelector(selectCounter);
    const [posts] = useGetPosts(
        params.category,
        params.forum,
        params.page,
        counter
    );

    return (
        <Container maxWidth="lg">
            <Breadcrumb />
            <Box>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "1em",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "3rem",
                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{ textTransform: "capitalize" }}
                    >
                        {params.forum}
                    </Typography>
                    <Link
                        to={`/create-post/${params.category}/${params.forum}`}
                    >
                        <Button
                            color="secondary"
                            variant="contained"
                            onMouseEnter={() => {
                                setIsHovering(true);
                            }}
                            onMouseLeave={() => {
                                setIsHovering(false);
                            }}
                            endIcon={
                                isHovering && (
                                    <Grow in={isHovering} timeout={350}>
                                        <AddIcon />
                                    </Grow>
                                )
                            }
                        >
                            Create Post
                        </Button>
                    </Link>
                </Box>
                {posts && posts.length > 0 && (
                    <Grid
                        container
                        sx={{
                            padding: ".75em 1em",
                        }}
                    >
                        <Grid item xs={6} md={9}>
                            <Typography
                                sx={{
                                    fontSize: "1rem",
                                    color: "var(--fc-primary-muted)",
                                }}
                            >
                                Topic
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            md={1}
                            sx={{ display: "flex", justifyContent: "end" }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "1rem",
                                    color: "var(--fc-primary-muted)",
                                }}
                            >
                                Author
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={0}
                            md={1}
                            sx={{
                                display: { xs: "none", md: "flex" },
                                justifyContent: "end",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "1rem",
                                    color: "var(--fc-primary-muted)",
                                }}
                            >
                                Replies
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={0}
                            md={1}
                            sx={{
                                display: { xs: "none", md: "flex" },
                                justifyContent: "end",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "1rem",
                                    color: "var(--fc-primary-muted)",
                                }}
                            >
                                Activity
                            </Typography>
                        </Grid>
                    </Grid>
                )}
                {posts &&
                    posts.map((post, index) => {
                        return <PostPreview key={index} post={post} />;
                    })}
                {posts && posts.length === 0 && (
                    <Typography>
                        There don't seem to be any posts yet. Be the first!
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default Forum;
