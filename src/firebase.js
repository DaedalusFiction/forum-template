import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
    browserLocalPersistence,
    getAuth,
    GoogleAuthProvider,
    setPersistence,
} from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDQsze56WKgrj5J5OUyBQ2yHup9Jdyj3u8",
    authDomain: "forum-template-1166f.firebaseapp.com",
    projectId: "forum-template-1166f",
    storageBucket: "forum-template-1166f.appspot.com",
    messagingSenderId: "209208640806",
    appId: "1:209208640806:web:4dfaee0f0d4ea4cb6f2de7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.addScope("profile");
const auth = getAuth();

const storage = getStorage();
(async () => {
    await setPersistence(auth, browserLocalPersistence);
})();

export { app, db, storage, provider, auth };
