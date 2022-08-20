import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./navigation/screens/Login";
import MainContainer from "./navigation/MainContainer";
import AddUsers from "./navigation/screens/AddUsers";
import Events from "./navigation/screens/Events";
import Calendar from "./navigation/screens/Calendar";
import Chats from "./navigation/screens/Chats";
import ProfileView from "./navigation/screens/ProfileView";
import Register from "./navigation/screens/Register";

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

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainContainer" component={MainContainer} />
        <Stack.Screen name="Friends" component={AddUsers} />
        <Stack.Screen name="Discover" component={Events} />
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="Chats" component={Chats} />
        <Stack.Screen name="Profile" component={ProfileView} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
