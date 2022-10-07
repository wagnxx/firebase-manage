// import firebase from 'firebase/app'
// import 'firebase/auth'



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  FieldValue,
  serverTimestamp,
  DocumentData,
  query,
  where,
  onSnapshot,
} from "firebase/firestore"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  signOut,
  User
} from "firebase/auth" // New import
import { type } from "os";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCjook-5vFlwOjF2Dd4ExUscYGqjZhWrgo",
//   authDomain: "auth-development-b88a5.firebaseapp.com",
//   projectId: "auth-development-b88a5",
//   storageBucket: "auth-development-b88a5.appspot.com",
//   messagingSenderId: "867028945748",
//   appId: "1:867028945748:web:009ca1b1fe44a555ad96c1"
// };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const fireStore = getFirestore(app)

// const bindDoc = doc.bind(fireStore);

const folderDocRef = (path: string[]) => {
  // const args = [].concat(path)
  return doc(fireStore, 'folders', ...path)
}
const files = (path: string[]) => {
  // const args = [].concat(path)
  return doc(fireStore, 'files', ...path)
}

export const database = {
  folders: collection(fireStore, 'folders'),
  files: collection(fireStore, 'files'),
  addDoc,
  getCurrentTimestamp: serverTimestamp,
  query,
  where,
  getDocs,
  formatDoc: (doc: DocumentData) => ({ id: doc.id, ...doc.data() }),
  getDoc: (path: string, ...pathArr: string[]) => {

    return getDoc(doc(fireStore, path, ...pathArr))
  },
  onSnapshot,
  getStorage, ref, uploadBytesResumable, getDownloadURL
}

export {
  auth,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  signInWithEmailAndPassword,

}
export type {
  User
}
export default app;