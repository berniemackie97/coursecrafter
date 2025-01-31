// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { FIREBASE_API_KEY } from "@env";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "course-crafter-2025.firebaseapp.com",
  projectId: "course-crafter-2025",
  storageBucket: "course-crafter-2025.firebasestorage.app",
  messagingSenderId: "442200186334",
  appId: "1:442200186334:web:8d067dd92c06f3daa6114f",
  measurementId: "G-4Q4ED62S3E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app,{
  persistence:getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app)
const analytics = getAnalytics(app);
