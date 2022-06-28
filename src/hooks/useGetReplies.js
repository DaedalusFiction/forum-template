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

function useGetReplies(id) {
    const [replies, setReplies] = useState(null);

    useEffect(() => {
        async function getReplies() {
            const postsQuery = query(
                collectionGroup(db, "replies"),
                where("parentID", "==", id),
                orderBy("createdAt", "desc"),
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
    }, [id]);
    return replies;
}

export default useGetReplies;
