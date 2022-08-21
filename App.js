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
