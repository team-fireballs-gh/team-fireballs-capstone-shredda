import React, { useEffect, useState } from "react";
import { Animated, Text, StyleSheet, ScrollView, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { getAllEvents } from "../../redux/reducers/events/eventsReducer";
import EventCard from "./EventCard";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

export default function Events({ navigation }) {
  let events = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEvents());
  }, []);

  const [searchPhrase, setSearchPhrase] = useState("");

  return (
    <Animated.View style={[{ flex: 1, backgroundColor: "white" }]}>
      <SearchBar />
      <View style={styles.personalEvents}>
        <Pressable onPress={() => navigation.navigate("Rsvps")}>
          <Text style={styles.rsvp}>
            <Ionicons name="add-circle" size={25} color="green"></Ionicons>
          </Text>
        </Pressable>
        <Pressable>
          <Text style={styles.interested}>
            {" "}
            <Ionicons name="star" size={25} color="orange"></Ionicons>
          </Text>
        </Pressable>
      </View>
      <ScrollView>
        {events.map((event) => {
          return (
            <EventCard
              key={event.id}
              eventInfo={event}
              navigation={navigation}
            />
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  personalEvents: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
  loading: {
    textAlign: "center",
    justifyContent: "center",
  },
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
