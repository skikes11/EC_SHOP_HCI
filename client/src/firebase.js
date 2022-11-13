// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0N-Y7Luy070v4tGigFcwPDU84UKxXx7g",
  authDomain: "cnpmm-d00c6.firebaseapp.com",
  projectId: "cnpmm-d00c6",
  storageBucket: "cnpmm-d00c6.appspot.com",
  messagingSenderId: "20400732697",
  appId: "1:20400732697:web:bf8954c7256b7eab308888"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);