import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "Something",
  authDomain: "Something",
  projectId: "Something",
  storageBucket: "Something",
  messagingSenderId: "Something",
  appId: "Something",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
const db = firebaseApp.firestore();
export const auth = firebase.auth();

export default db;
