import React, { useEffect } from "react";
import { Animated, Text, StyleSheet, ScrollView } from "react-native";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import EventCard from "./EventCard";
import { getSingleUser } from "../../redux/reducers/users/singleUserReducer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/db";
import { getAllRsvpEvents } from "../../redux/reducers/events/rsvpReducer";

export default function Rsvps({ navigation }) {
  let singleUserRsvps = useSelector((state) => state.singleUser.rsvp);
  let allRsvps = useSelector((state) => state.rsvps);
  let [user] = useAuthState(auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleUser(user.uid));
  }, []);

  useEffect(() => {
    dispatch(getAllRsvpEvents(singleUserRsvps));
  }, [singleUserRsvps]);

  console.log("all RSVPS", allRsvps);

  return (
    <Animated.View style={[{ flex: 1, backgroundColor: "white" }]}>
      <SearchBar />
      <Text>RSVPS</Text>
      <ScrollView>
        {allRsvps.map((event) => {
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
