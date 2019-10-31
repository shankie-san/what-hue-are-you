import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAqscua7350rpmyAJ4qdTZ5IxELd31848U",
  authDomain: "what-hue.firebaseapp.com",
  databaseURL: "https://what-hue.firebaseio.com",
  projectId: "what-hue",
  storageBucket: "what-hue.appspot.com",
  messagingSenderId: "812469587797",
  appId: "1:812469587797:web:1aadcd3baf4c313ba369dc",
  measurementId: "G-3CK6749FGD"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default app;
