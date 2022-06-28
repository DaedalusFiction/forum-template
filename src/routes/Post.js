import React, { useEffect } from "react";
import useGetPost from "../hooks/useGetPost";
import { useParams } from "react-router-dom";

const Post = () => {
    const params = useParams();
    const post = useGetPost(params.category, params.forum, params.id);
    useEffect(() => {
        if (post) {
            console.log(post.data());
        }
    }, [post]);
    return <div>{post.data().author}</div>;
};

export default Post;
