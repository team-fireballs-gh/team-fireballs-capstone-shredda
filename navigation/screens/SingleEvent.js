import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, Text, View, StyleSheet, ScrollView, SafeAreaView, Pressable
} from 'react-native';
import Entypo from "react-native-vector-icons/Entypo";
import AntIcon from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";

export default function SingleEvent() {
    return (
        <SafeAreaView style={[{ flex: 1 }]}>
            <View style={styles.profileContainer}>
                <Image
                style={styles.backgroundImage}
                source={{
                    uri: 'https://experiencity.ca/blog/articlesimages/display/e10/704/6551358d843fb25a3434a93321/latern-eventhub-RhinoCanada-ca.jpg',
                }}/>
            </View>
            <Text style={styles.eventName}>
                Event Name
            </Text>
            <View style={styles.location} flexDirection="row" justifyContent="space-evenly"> 
                <Text style={styles.locationText}>
                    <Entypo name="location-pin" size={20} color="gray"/>
                    City, State
                </Text>
                <Text style={styles.dateText}>
                    <AntIcon name="calendar" size={20} color="gray"/>
                    dates
                </Text>
                <Pressable>
                    <Feather name="edit" size={20} color="gray"/>
                </Pressable>
            </View>
            <ScrollView>
                <Text style={styles.header}>Description</Text>
                <Text style={styles.content}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar
                    mattis nunc sed blandit libero volutpat. Pellentesque habitant morbi
                    tristique senectus et netus et malesuada fames. In fermentum posuere
                    urna nec tincidunt praesent semper.
                </Text>
                <Text style={styles.header}>type</Text>
                <Text style={styles.content}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar
                    mattis nunc sed blandit libero volutpat. Pellentesque habitant morbi
                    tristique senectus et netus et malesuada fames. In fermentum posuere
                    urna nec tincidunt praesent semper.
                </Text>
                <Text style={styles.header}>About Me</Text>
                <Text style={styles.content}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar
                    mattis nunc sed blandit libero volutpat. Pellentesque habitant morbi
                    tristique senectus et netus et malesuada fames. In fermentum posuere
                    urna nec tincidunt praesent semper.
                </Text>
                <Text style={styles.content}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar
                    mattis nunc sed blandit libero volutpat. Pellentesque habitant morbi
                    tristique senectus et netus et malesuada fames. In fermentum posuere
                    urna nec tincidunt praesent semper.
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    profileContainer: {
        height: "25%",
        width: "100%",
        backgroundColor: "white",
        elevation: 4,
    },
    backgroundImage: {
        height: "100%",
        width: "100%",
    },  
    textContainer: {
        backgroundColor: "gray",
        opacity: 0.8,
        position: 'absolute',
        bottom:0,
        width: '100%',
        height:  120,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    eventName: {
        fontSize: 30,
        color: 'black',
        marginHorizontal: 10,
        marginTop: 5,
        alignSelf: "center",
    },
    locationText: {
        fontSize: 16,
        color: 'grey',
    },
    dateText: {
        fontSize: 16,
        color: 'grey',
    },
    location: {
        marginBottom: 8,
    },
    header: {
        fontSize: 18,
        fontWeight: "bold",
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: "5%",
    },
    content: {
        fontSize: 16,
        marginLeft: "5%",
        marginRight: "10%",
    },
})