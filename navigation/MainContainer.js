import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "react-native-vector-icons";

// Screen Components
import AddUsers from "./screens/AddUsers";
import Events from "./screens/Events";
import Calendar from "./screens/Calendar";
import Chats from "./screens/Chats";
import ProfileView from "./screens/ProfileView";
import Login from "./screens/Login";
import Register from "./screens/Register";

import useAuth from "../auth";

const { Navigator, Screen } = createBottomTabNavigator();

// Navigator -
// Screen - "name" (the name to use for the screen) & "component" (the react component to render for the screen) are 2 of the many props it can take;

export default function MainContainer() {
  // the "GROUP"" component - is used to group several 'screens' inside a navigator;
  const { user } = useAuth();
  return (
    <Navigator
      initialRouteName="Friends" // this sets the default screen;
      // The options specified in 'screenOptions' apply to all of the screens in the navigator;
      screenOptions={({ route }) => ({
        // each screen component in the app is provided with the "route" prop automatically; more info: https://reactnavigation.org/docs/route-prop
        tabBarActiveTintColor: "tomato", // when the "focus" is on that icon, it will turn in this color;
        tabBarInactiveTintColor: "grey",
        labelStyle: { paddingBottom: 10, fontSize: 10 },
        style: { padding: 10, height: 70 },

        tabBarShowLabel: false,

        tabBarIcon: ({ focused, color }) => {
          // focused: boolean, color: string, size: number
          let iconName;
          let routeName = route.name;

          if (routeName === "Friends") {
            iconName = focused ? "people-circle" : "people-circle-outline";
          } else if (routeName === "Discover") {
            iconName = focused ? "ios-compass" : "ios-compass-outline";
          } else if (routeName === "Calendar") {
            iconName = focused ? "ios-calendar" : "ios-calendar-outline";
          } else if (routeName === "Chats") {
            iconName = focused
              ? "ios-chatbubble-ellipses"
              : "ios-chatbubble-ellipses-outline";
          } else if (routeName === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          return <Ionicons name={iconName} size={35} color={color} />;
        },
      })}
    >
      {user ? (
        <>
          <Screen
            name="Friends"
            component={AddUsers}
            options={{ headerShown: false }}
          />
          <Screen name="Discover" component={Events} />
          <Screen name="Calendar" component={Calendar} />
          <Screen
            name="Chats"
            component={Chats}
            options={{ headerShown: false }}
          />
          <Screen name="Profile" component={ProfileView} />
        </>
      ) : (
        <>
          <Screen
            name="Login"
            component={Login}
            options={{ headerShown: false, tabBarStyle: { display: "none" } }}
          />
          <Screen name="Register" component={Register} options={{ headerShown: false, tabBarStyle: { display: "none" } }} />
        </>
      )}
    </Navigator>
  );
}
