// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHL5gh_g-acBmsoNCvCEfNMsuK0PiLuDw",
  authDomain: "mern-auth-a4a8b.firebaseapp.com",
  projectId: "mern-auth-a4a8b",
  storageBucket: "mern-auth-a4a8b.appspot.com",
  messagingSenderId: "1042343461426",
  appId: "1:1042343461426:web:5a08ee28463589045b322b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);