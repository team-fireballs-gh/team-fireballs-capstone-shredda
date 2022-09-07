import React, { useEffect } from "react";
import {
  Animated,
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import EventCard from "./EventCard";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/db";
import { getAllInterestedEvents } from "../../redux/reducers/events/interestedReducer";

export default function Interested({ navigation }) {
  let allInterested = useSelector((state) => state.interested);
  let [user] = useAuthState(auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllInterestedEvents(user.uid));
  }, []);

  return (
    <Animated.View style={[{ flex: 1, backgroundColor: "white" }]}>
      <SearchBar />
      <ScrollView>
        {allInterested.length > 0 ? (
          allInterested.map((event) => {
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
            <Text style={styles.noEventMsg}>No Interests yet!</Text>
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
});
