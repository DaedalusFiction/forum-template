import { useState, useEffect } from "react";
import {
    collection,
    doc,
    collectionGroup,
    query,
    orderBy,
    limit,
    getDocs,
    getDoc,
    where,
    startAfter,
} from "firebase/firestore";
import { db } from "../firebase";

function useGetReplies(category, forum, id) {
    const [replies, setReplies] = useState(null);

    useEffect(() => {
        async function getReplies() {
            const postsQuery = query(
                collection(db, `forums/${category}/${forum}/${id}/replies`),
                orderBy("createdAt", "asc"),
                // startAfter(0),
                limit(25)
            );

            const docsSnap = await getDocs(postsQuery);
            let newReplies = [];
            docsSnap.docs.forEach((doc, index) => {
                newReplies = [...newReplies, doc];
                // console.log(doc.data());
            });
            setReplies(newReplies);
        }

        getReplies();
    }, [id, category, forum]);
    return replies;
}

export default useGetReplies;
