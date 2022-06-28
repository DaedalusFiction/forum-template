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

function useGetPosts(forum, page) {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        console.log(forum);
        async function getPosts() {
            const postsQuery = query(
                collectionGroup(db, forum),
                // orderBy("author", "desc"),
                // startAfter(0),
                limit(25)
            );

            const docsSnap = await getDocs(postsQuery);
            let newPosts = [];
            docsSnap.docs.forEach((doc, index) => {
                newPosts = [...newPosts, doc];
                // console.log(doc.data());
            });
            setPosts(newPosts);
        }

        getPosts();
    }, [forum, page]);
    return [posts];
}

export default useGetPosts;
