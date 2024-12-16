import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyCJn4sLQvbj-ZAQWcmDSrxc41K04gCQ7NU",
  authDomain: "netflixx-64a54.firebaseapp.com",
  projectId: "netflixx-64a54",
  storageBucket: "netflixx-64a54.firebasestorage.app",
  messagingSenderId: "152420166432",
  appId: "1:152420166432:web:37ad609e08e095436ac545",
  measurementId: "G-JF393EWRFR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

const signup = async (name, email, password) => {
    try {
       const res = await createUserWithEmailAndPassword(auth,email,password);
    const user = res.user;
    await addDoc(collection (db, "user"), {
        uid: user.uid,
        name,
        authProvider: 'local',
        email,
    });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/'[1].split('-').join(" ")));
    }
}

const login = async (email, password) => {
    try {

       await signInWithEmailAndPassword(auth, email, password)

    } catch(error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}

const logout = () => {
    signOut(auth);
}
export{auth, db, login, signup, logout};