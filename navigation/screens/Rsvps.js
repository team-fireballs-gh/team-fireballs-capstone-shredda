import React, { useEffect } from "react";
import {
  Animated,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  View,
} from "react-native";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import EventCard from "./EventCard";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/db";
import { getAllRsvpEvents } from "../../redux/reducers/events/rsvpReducer";

export default function Rsvps({ navigation }) {
  let allRsvps = useSelector((state) => state.rsvps);
  let [user] = useAuthState(auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRsvpEvents(user.uid));
  }, []);

  return (
    <Animated.View style={[{ flex: 1, backgroundColor: "white" }]}>
      <SearchBar />
      <ScrollView>
        {allRsvps.length > 0 ? (
          allRsvps.map((event) => {
            return (
              <EventCard
                key={event.id}
                eventInfo={event}
                navigation={navigation}
              />
            );
          })
        ) : (
          <View style={styles.noEvents}>
            <Text style={styles.noEventMsg}>No RSVPs yet!</Text>
            <Pressable
              style={styles.noEventBtn}
              onPress={() => navigation.navigate("Discover")}
            >
              <Text style={styles.noEventBtnText}>
                Discover Events Near You
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  noEventBtn: {
    backgroundColor: "tomato",
    padding: 10,
    borderRadius: 10,
  },
  noEventBtnText: {
    color: "white",
    fontSize: 15,
  },
  noEvents: {
    marginTop: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 20,
  },
  noEventMsg: {
    fontSize: 20,
    margin: 10,
    color: "tomato",
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
