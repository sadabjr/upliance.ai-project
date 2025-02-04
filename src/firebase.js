import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCY80o0JPgTuOXloSIqDumDCOALcw4f1Rw",
    authDomain: "assignment-8fa28.firebaseapp.com",
    projectId: "assignment-8fa28",
    storageBucket: "assignment-8fa28.firebasestorage.app",
    messagingSenderId: "842990279644",
    appId: "1:842990279644:web:a2b6928553d80c56cd0d19"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => signInWithPopup(auth, provider);
const logout = () => signOut(auth);

export { auth, signInWithGoogle, logout };
