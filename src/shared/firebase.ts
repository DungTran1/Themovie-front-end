import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6fq-Z_ojYnnKLsUaI0PMpCVUtpLfiI7w",
  authDomain: "the-movie-83586.firebaseapp.com",
  databaseURL: "https://the-movie-83586-default-rtdb.firebaseio.com",
  projectId: "the-movie-83586",
  storageBucket: "the-movie-83586.appspot.com",
  messagingSenderId: "318157713215",
  appId: "1:318157713215:web:f1f3d856d529a57ba42d8a",
  measurementId: "G-3HTZ3DJSZT",
  // ...
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
