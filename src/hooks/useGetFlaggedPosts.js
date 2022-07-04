import { useState, useEffect } from "react";
import {
    collection,
    collectionGroup,
    query,
    orderBy,
    limit,
    getDocs,
    where,
    startAfter,
} from "firebase/firestore";
import { db } from "../firebase";

function useGetFlaggedPosts() {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        async function getPosts() {
            const postsQuery = collection(db, `flaggedPosts`);

            const docsSnap = await getDocs(postsQuery);
            let newPosts = [];
            docsSnap.docs.forEach((doc, index) => {
                newPosts = [...newPosts, doc];
            });
            setPosts(newPosts);
        }

        getPosts();
    }, []);
    return [posts];
}

export default useGetFlaggedPosts;
