import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Animated, TouchableOpacity, ImageBackground, Text, View,
  StyleSheet, TouchableWithoutFeedback, ScrollView, SafeAreaView, Image
} from 'react-native';

export default function SingleEvent() {
    return (
        <SafeAreaView style={[{ flex: 1 }]}>
            <View style={styles.profileContainer}>
                <ImageBackground
                style={styles.backgroundImage}
                source={{
                    uri: 'https://experiencity.ca/blog/articlesimages/display/e10/704/6551358d843fb25a3434a93321/latern-eventhub-RhinoCanada-ca.jpg',
                }}/>
            </View>
            <ScrollView>
                <Text style={styles.eventName}>
                    Event Name
                </Text>
                <Text style={styles.header}>About Me</Text>
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
    header: {
        fontSize: 16,
        fontWeight: "bold",
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: "5%",
    },
    content: {
        marginLeft: "5%",
        marginRight: "10%",
    },
})