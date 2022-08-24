import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZAYbEHtOvsMvJXg2mCIOtg0Fb6wH2j74",
  authDomain: "team-fireballs-capstone.firebaseapp.com",
  projectId: "team-fireballs-capstone",
  storageBucket: "team-fireballs-capstone.appspot.com",
  messagingSenderId: "452789543304",
  appId: "1:452789543304:web:7436dc9adeceb84c1a9a3d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, { // To remove the AsyncStorage warning;
  persistence: getReactNativePersistence(AsyncStorage),
});
// export const auth = getAuth(app);
export const db = getFirestore(app);
// const storage = getStorage(firebaseApp);

export default app;
