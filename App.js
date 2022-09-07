import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AuthProvider } from "./auth";

import MainContainer from "./navigation/MainContainer";
import AddUsers from "./navigation/screens/AddUsers";
import Events from "./navigation/screens/Events";
import SingleEvent from "./navigation/screens/SingleEvent";
import AddEvent from "./navigation/screens/AddEvent";
import EditEvent from "./navigation/screens/EditEvent";
import Calendar from "./navigation/screens/Calendar";
import Chats from "./navigation/screens/Chats";
import ProfileView from "./navigation/screens/ProfileView";
import Register from "./navigation/screens/Register";
import CreateProfile from "./navigation/screens/CreateProfile";
import UpdateUser from "./navigation/screens/UpdateUser";
import Match from "./navigation/screens/Match";
import Message from "./navigation/screens/Message";
import SingleLocation from "./navigation/screens/SingleEventMap";
import PeopeProfile from "./navigation/screens/PeopeProfile";
import PublicChat from "./navigation/screens/PublicChat";
import UserProfile from "./navigation/screens/UserProfile";
import Map from "./navigation/screens/Map";
import Rsvps from "./navigation/screens/Rsvps";
import PublicMessage from "./navigation/screens/PublicMessage";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthProvider>
          <Stack.Navigator>
            <Stack.Group>
              <Stack.Screen
                name="MainContainer"
                component={MainContainer}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Friends"
                component={AddUsers}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Discover" component={Events} />
              <Stack.Screen name="Calendar" component={Calendar} />
              <Stack.Screen
                name="Chats"
                component={Chats}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Message" component={Message} />
              <Stack.Screen name="Messages" component={PublicMessage} />
              <Stack.Screen name="Profile" component={ProfileView} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="CreateProfile" component={CreateProfile} />
              <Stack.Screen name="Event Name" component={SingleEvent} />
              <Stack.Screen name="AddEvent" component={AddEvent} />
              <Stack.Screen name="EditEvent" component={EditEvent} />
              <Stack.Screen name="Location" component={SingleLocation} />
              <Stack.Screen name="Map" component={Map} />
              <Stack.Screen name="Profiles" component={PeopeProfile} />
              <Stack.Screen name="Public" component={PublicChat} />
              <Stack.Screen name="User" component={UserProfile} />
              <Stack.Screen name="RSVPs" component={Rsvps} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: "modal" }}>
              <Stack.Screen
                name="updateUser"
                component={UpdateUser}
                options={{ headerShown: false }}
              />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
              <Stack.Screen
                name="Match"
                component={Match}
                options={{ headerShown: false }}
              />
            </Stack.Group>
          </Stack.Navigator>
        </AuthProvider>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
