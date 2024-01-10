// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBh7yH7tnB8CKYEcr9fhkfTSR50riy9wPI",
  authDomain: "unimanager-58c77.firebaseapp.com",
  projectId: "unimanager-58c77",
  storageBucket: "unimanager-58c77.appspot.com",
  messagingSenderId: "691840003863",
  appId: "1:691840003863:web:36b9a8892453f10b51d152",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
