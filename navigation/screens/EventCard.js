import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";

export default function EventCard({ navigation, eventInfo }) {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Event Name");
      }}
    >
      <View style={styles.card}>
        <StatusBar style="auto" />
        <View style={styles.cardContent}>
          <ImageBackground
            style={{ height: "100%", width: "100%" }}
            imageStyle={{ borderRadius: 10 }}
            source={{
              uri: "https://experiencity.ca/blog/articlesimages/display/e10/704/6551358d843fb25a3434a93321/latern-eventhub-RhinoCanada-ca.jpg",
            }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.eventName}>{eventInfo.title}</Text>
              <Text style={styles.eventInfo}>
                {/* {eventInfo.startDate,  */}
                Date Here,
                {eventInfo.address}
              </Text>
            </View>
          </ImageBackground>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 400,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: "5%",
    margin: 10,
  },
  cardContent: {
    marginHorizontal: 0,
    marginVertical: 0,
  },
  textContainer: {
    backgroundColor: "gray",
    opacity: 0.8,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 120,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  eventName: {
    fontSize: 40,
    color: "white",
    fontFamily: "Georgia",
    marginHorizontal: 10,
    marginTop: 0,
  },
  eventInfo: {
    fontSize: 20,
    color: "white",
    fontFamily: "Georgia",
    marginHorizontal: 10,
    marginTop: 0,
  },
});
