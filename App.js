
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import ProfileView from "./components/ProfileView";
import * as React from 'react';
import MainContainer from './navigation/MainContainer';
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
  storageBucket: "gs://team-fireballs-capstone.appspot.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

function App() {
  return (
    <MainContainer/>
  );
}

export default App;
