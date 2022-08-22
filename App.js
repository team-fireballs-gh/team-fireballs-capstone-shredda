import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./navigation/screens/Login";
import MainContainer from "./navigation/MainContainer";
import AddUsers from "./navigation/screens/AddUsers";
import Events from "./navigation/screens/Events";
import SingleEvent from "./navigation/screens/SingleEvent";
import AddEvent from "./navigation/screens/AddEvent";
import Calendar from "./navigation/screens/Calendar";
import Chats from "./navigation/screens/Chats";
import ProfileView from "./navigation/screens/ProfileView";
import Register from "./navigation/screens/Register";
import CreateProfile from "./navigation/screens/CreateProfile";
import { Provider } from "react-redux";
import store from "./redux/store";

import { AuthProvider } from "./auth";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>

        <AuthProvider>
          <Stack.Navigator>
            
            <Stack.Screen name="MainContainer" component={MainContainer} options={{ headerShown: false }} />
            {/* <Stack.Screen name="Login" component={Login} /> */}
            <Stack.Screen name="Friends" component={AddUsers} />
            <Stack.Screen name="Discover" component={Events} />
            <Stack.Screen name="Calendar" component={Calendar} />
            <Stack.Screen name="Chats" component={Chats} />
            <Stack.Screen name="Profile" component={ProfileView} />
            {/* <Stack.Screen name="Register" component={Register} /> */}
            <Stack.Screen name="CreateProfile" component={CreateProfile} />
            <Stack.Screen name="Event Name" component={SingleEvent} />
            <Stack.Screen name="AddEvent" component={AddEvent} />
          </Stack.Navigator>
        </AuthProvider>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
