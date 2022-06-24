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
    apiKey: "AIzaSyBK3r3jnes_awgfFdqJzofbUMh5Sj2K08s",
    authDomain: "treble-92324.firebaseapp.com",
    projectId: "treble-92324",
    storageBucket: "treble-92324.appspot.com",
    messagingSenderId: "435246677482",
    appId: "1:435246677482:web:8adbdefd95f6529e288693",
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
