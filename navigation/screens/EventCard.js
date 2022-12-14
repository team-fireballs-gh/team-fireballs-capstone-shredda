import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import { updateUser } from "../../redux/reducers/users/usersReducer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/db";
import { arrayUnion, arrayRemove } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { getSingleUser } from "../../redux/reducers/users/singleUserReducer";
import { Ionicons } from "react-native-vector-icons";
import { getAllEvents } from "../../redux/reducers/events/eventsReducer";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

export default function EventCard({ navigation, eventInfo }) {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.singleUser);
  let [interestBtn, setInterestBtn] = useState(
    currentUser.interested !== undefined &&
      currentUser.interested.includes(eventInfo.id) ? (
      <Ionicons name="star" size={20} color="orange"></Ionicons>
    ) : (
      <Ionicons name="star-outline" size={20} color="orange"></Ionicons>
    )
  );

  useEffect(() => {
    dispatch(getAllEvents());
    dispatch(getSingleUser(user.uid));
  }, []);

  useEffect(() => {
    dispatch(getSingleUser(user.uid));
  }, [interestBtn]);

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Event Name", { id: eventInfo["id"] });
      }}
    >
      <View style={styles.card}>
        <StatusBar style="auto" />
        <View style={styles.cardContent}>
          <ImageBackground
            style={{ height: "100%", width: "100%" }}
            imageStyle={{ borderRadius: 10 }}
            source={{
              uri: eventInfo.data.imageUrl
                ? eventInfo.data.imageUrl
                : eventInfo.imageUrl,
            }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.eventName}>
                {eventInfo["data"]["title"]}
                <Pressable
                  style={styles.interested}
                  onPress={() => {
                    console.log(currentUser);
                    if (
                      currentUser.interested &&
                      currentUser.interested.includes(eventInfo.id)
                    ) {
                      updateUser(
                        user.uid,
                        {
                          interested: arrayRemove(eventInfo.id),
                        },
                        { merge: true }
                      );
                      deleteDoc(
                        doc(db, "users", user.uid, "interested", eventInfo.id)
                      );
                      setInterestBtn(
                        <Ionicons
                          name="star-outline"
                          size={20}
                          color="orange"
                        ></Ionicons>
                      );
                      dispatch(getAllEvents());
                    } else if (
                      currentUser.interested &&
                      !currentUser.interested.includes(eventInfo.id)
                    ) {
                      updateUser(
                        user.uid,
                        {
                          interested: arrayUnion(eventInfo.id),
                        },
                        { merge: true }
                      );
                      setDoc(
                        doc(db, "users", user.uid, "interested", eventInfo.id),
                        eventInfo
                      );
                      setInterestBtn(
                        <Ionicons
                          name="star"
                          size={20}
                          color="orange"
                        ></Ionicons>
                      );
                      dispatch(getAllEvents());
                    }
                  }}
                >
                  <Text>{interestBtn}</Text>
                </Pressable>
              </Text>
              <Text style={styles.eventInfo}>{eventInfo.data.startDate}</Text>
              <Text style={styles.eventInfo}>{eventInfo.data.address}</Text>
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
    fontSize: 35,
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
  interested: {
    padding: 5,
  },
});
