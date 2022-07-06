import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function useGetPosts(category, forum, page, counter) {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        async function getPosts() {
            const postsQuery = query(
                collection(db, `forums/${category}/${forum}`),
                orderBy("latestReply", "desc"),
                // startAfter(0),
                limit(25)
            );

            const docsSnap = await getDocs(postsQuery);
            let newPosts = [];
            docsSnap.docs.forEach((doc, index) => {
                newPosts = [...newPosts, doc];
            });
            setPosts(newPosts);
        }

        getPosts();
    }, [forum, page, category, counter]);
    return [posts];
}

export default useGetPosts;
