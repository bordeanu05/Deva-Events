import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  
};

const app = firebase.initializeApp(firebaseConfig);
const FIREBASE_AUTH = firebase.auth(app);
const FIREBASE_FIRESTORE = firebase.firestore(app);
const FIREBASE_STORAGE = firebase.storage(app);

export { firebase };
export { FIREBASE_AUTH };
export { FIREBASE_FIRESTORE };
export { FIREBASE_STORAGE };