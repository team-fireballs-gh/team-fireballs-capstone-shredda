import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import AddUsers from './screens/AddUsers';
import UserProfile from './screens/UserProfile';
import Events from './screens/Events';
import Calendar from './screens/Calendar';
import Chats from './screens/Chats';

const { Navigator, Screen } = createBottomTabNavigator();

export default function MainContainer() {
    return (
        <NavigationContainer>
            <Navigator
                initialRouteName='Add'
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'grey',
                    labelStyle: { paddingBottom: 10, fontSize: 10 },
                    style: { padding: 10, height: 70},

                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let routeName = route.name;

                        if (routeName === 'Friends') {
                            iconName = focused ? 'people-circle' : 'people-circle-outline';
                        } else if (routeName === 'Discover') {
                            iconName = focused ? 'ios-compass' : 'ios-compass-outline';
                        } else if (routeName === 'Calendar') {
                            iconName = focused ? 'ios-calendar' : 'ios-calendar-outline';
                        } else if (routeName === 'Chats') {
                            iconName = focused ? 'ios-chatbubble-ellipses' : 'ios-chatbubble-ellipses-outline'
                        } else if (routeName === 'Profile') {
                            iconName = focused ? 'person-circle' : 'person-circle-outline'
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}>

                <Screen name='Friends' component={AddUsers} />
                <Screen name='Discover' component={Events} />
                <Screen name='Calendar' component={Calendar} />
                <Screen name='Chats' component={Chats} />
                <Screen name='Profile' component={UserProfile} />

            </Navigator>
        </NavigationContainer>
    );
};

