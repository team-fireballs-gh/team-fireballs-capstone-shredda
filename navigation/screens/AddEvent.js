import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, Button } from "react-native";
import { addEvent } from "../../redux/reducers/events/eventsReducer";
import { useAuthState } from "react-firebase-hooks/auth"
import {auth} from "../../firebase/db";

export default function AddEvent({ navigation }) {
  let [eventName, setEventName] = useState("");
  let [eventDate, setEventDate] = useState("");
  let [eventAddress, setEventAddress] = useState("");
  let [eventLink, setEventLink] = useState("");

  const [user] = useAuthState(auth);

  const _addEvent = async () => {
    const eventToAdd = {
      authorID: user.uid,
      title: eventName,
      startDate: eventDate, // will change this when we figure out date input
      address: eventAddress,
      websiteLink: eventLink,
    };
    await addEvent(eventToAdd);
    navigation.navigate("Discover");
  };

  return (
    <View style={styles.wholeContainer}>
      <View style={styles.individualContainer}>
        <Text style={styles.header}>Pick a Name!</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEventName}
          placeholder="Event Name"
        />
      </View>
      <View style={styles.individualContainer}>
        <Text style={styles.header}>When is it?</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEventDate}
          placeholder="Date"
        />
      </View>
      <View style={styles.individualContainer}>
        <Text style={styles.header}>Where is it?</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEventAddress}
          placeholder="Address"
        />
      </View>
      <View style={styles.individualContainer}>
        <Text style={styles.header}>External Link</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEventLink}
          placeholder="Website Link"
        />
      </View>
      <Button color="tomato" title="Add Event" onPress={_addEvent} />
    </View>
  );
}
//make add event and single event as children of events component in app.js 

const styles = StyleSheet.create({
  wholeContainer: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
  individualContainer: {
    marginVertical: "5%",
  },
  header: {
    margin: 12,
    fontSize: 20,
    marginHorizontal: "5%",
  },
  input: {
    height: 40,
    marginHorizontal: "5%",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});
