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

function useGetPost(category, forum, id) {
    const [post, setPost] = useState(null);

    useEffect(() => {
        async function getPost() {
            // console.log(id);
            const docRef = doc(db, `forums/${category}/${forum}`, id);
            const newPost = await getDoc(docRef);
            // console.log(newPost.data());

            setPost(newPost);
        }

        getPost();
    }, [forum, id, category]);
    return post;
}

export default useGetPost;
