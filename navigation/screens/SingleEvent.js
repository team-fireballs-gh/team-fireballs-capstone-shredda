import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
} from "react-native";
import {
  Entypo,
  AntDesign,
  Feather,
  Ionicons,
} from "react-native-vector-icons";
import { getSingleEvent } from "../../redux/reducers/events/singleEventReducer";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/reducers/users/usersReducer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/db";
import { arrayUnion, arrayRemove } from "firebase/firestore";
import { getSingleUser } from "../../redux/reducers/users/singleUserReducer";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

export default function SingleEvent({ route, navigation }) {
  const { id } = route.params;
  let singleEvent = useSelector((state) => state.singleEvent);
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const currentUser = useSelector((state) => state.singleUser);
  let [rsvpBtn, setRsvpBtn] = useState(
    currentUser.rsvp !== undefined && currentUser.rsvp.includes(id) ? (
      <Ionicons name="add-circle" size={20} color="green"></Ionicons>
    ) : (
      <Ionicons name="add-circle-outline" size={20} color="orange"></Ionicons>
    )
  );

  useEffect(() => {
    dispatch(getSingleEvent(id));
    dispatch(getSingleUser(user.uid));
  }, []);

  useEffect(() => {
    dispatch(getSingleUser(user.uid));
  }, [rsvpBtn]);

  return (
    <SafeAreaView style={[{ flex: 1 }]}>
      <StatusBar style="auto" />
      <View style={styles.profileContainer}>
        <Image
          style={styles.backgroundImage}
          source={{
            uri: singleEvent.imageUrl,
          }}
        />
      </View>
      <Text style={styles.eventName}>{singleEvent.title}</Text>
      <View
        style={styles.location}
        flexDirection="row"
        justifyContent="space-evenly"
      >
        <Pressable
          style={styles.locationText}
          onPress={() => navigation.navigate("Location", { id: id })}
        >
          <Text style={styles.dateText}>
            <Entypo name="location-pin" size={20} color="gray">
              <Text style={{ fontSize: 15 }}>{singleEvent.address}</Text>
            </Entypo>
          </Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Calendar")}>
          <Text style={styles.dateText}>
            <AntDesign name="calendar" size={20} color="gray" />
            {singleEvent.startDate}
          </Text>
        </Pressable>
        <Pressable
          style={styles.interested}
          onPress={() => {
            if (currentUser.rsvp && currentUser.rsvp.includes(id)) {
              updateUser(
                user.uid,
                {
                  rsvp: arrayRemove(id),
                },
                { merge: true }
              );
              deleteDoc(doc(db, "users", user.uid, "rsvp", id));
              setRsvpBtn(
                <Ionicons
                  name="add-circle-outline"
                  size={20}
                  color="orange"
                ></Ionicons>
              );
            } else if (currentUser.rsvp && !currentUser.rsvp.includes(id)) {
              updateUser(
                user.uid,
                {
                  rsvp: arrayUnion(id),
                },
                { merge: true }
              );
              setDoc(doc(db, "users", user.uid, "rsvp", id), singleEvent);
              setRsvpBtn(
                <Ionicons name="add-circle" size={20} color="green"></Ionicons>
              );
            }
          }}
        >
          <Text style={styles.rsvpBtn}>RSVP {rsvpBtn}</Text>
        </Pressable>
        <Pressable>
          {singleEvent.authorID === user.uid ? (
            <Feather
              name="edit"
              size={20}
              color="gray"
              onPress={() => navigation.navigate("EditEvent", { id: id })}
            />
          ) : (
            <Text></Text>
          )}
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
      </ScrollView>
    </SafeAreaView>
  );
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
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 120,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  eventName: {
    fontSize: 30,
    color: "black",
    marginHorizontal: 10,
    marginTop: 5,
    alignSelf: "center",
  },
  locationText: {
    fontSize: 16,
    color: "grey",
  },
  dateText: {
    fontSize: 16,
    color: "grey",
    width: 120,
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
  interested: {
    color: "tomato",
  },
  rsvpBtn: {
    alignItems: "center",
  },
});
