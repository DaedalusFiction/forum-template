import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function useGetPost(category, forum, id, counter) {
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
    }, [forum, id, category, counter]);
    return post;
}

export default useGetPost;
