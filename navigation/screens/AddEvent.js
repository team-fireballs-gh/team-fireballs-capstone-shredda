import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Button,
  Pressable,
  ScrollView,
} from "react-native";
import {
  addEvent,
  getAllEvents,
} from "../../redux/reducers/events/eventsReducer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/db";
import DatePickerIOS from "@react-native-community/datetimepicker";
import AntIcon from "react-native-vector-icons/AntDesign";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";

export default function AddEvent({ navigation }) {
  let [eventName, setEventName] = useState("");
  let [eventAddress, setEventAddress] = useState("");
  let [eventLink, setEventLink] = useState("");
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  let [eventDate, setEventDate] = useState("");
  let [date, setDate] = useState(new Date());
  let [mode, setMode] = useState("date");
  let [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let formattedDate =
      tempDate.getMonth() +
      1 +
      "/" +
      tempDate.getDate() +
      "/" +
      tempDate.getFullYear();
    let formattedTime = tempDate.getHours() + ":" + tempDate.getMinutes();
    setEventDate(formattedDate + " " + formattedTime);
  };
  const showMode = (currentMode) => {
    setMode(currentMode);
    setShow(true);
  };

  const _addEvent = async () => {
    const eventToAdd = {
      authorID: user.uid,
      title: eventName,
      startDate: eventDate,
      address: eventAddress,
      websiteLink: eventLink,
    };
    await addEvent(eventToAdd);
    dispatch(getAllEvents());
    navigation.goBack("Discover");
  };

  return (
    <ScrollView>
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
          <View style={{ flexDirection: "row", marginHorizontal: "5%" }}>
            <Pressable onPress={() => showMode("date")}>
              <AntIcon name="calendar" size={20} color="tomato">
                {" "}
                Date{" "}
              </AntIcon>
            </Pressable>
            <Pressable onPress={() => showMode("time")}>
              <AntIcon name="clockcircleo" size={20} color="tomato">
                {" "}
                Time{" "}
              </AntIcon>
            </Pressable>
          </View>
          <View>
            {show && (
              <DatePickerIOS
                style={styles.datePicker}
                value={date}
                onChange={onChange}
                mode={mode}
                is24Hour={false}
                display="inline"
              />
            )}
          </View>
          <View style={styles.dateTime}>
            <Text>{eventDate}</Text>
          </View>
        </View>
        <View style={styles.individualContainer}>
          <Text style={styles.header}>Where is it?</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEventAddress}
            placeholder="Location"
          />
        </View>
        <GooglePlacesAutocomplete
          placeholder="Description"
          onPress={(data, details = null) => {
            console.log(data, details);
            console.log("DESCRIPTION", data.structured_formatting.main_text);
          }}
          selectProps={{
            eventAddress,
            onChangeText: setEventAddress,
          }}
          query={{
            key: "AIzaSyAcboHxUI2XRIfsHXv6GUNExGHAaAu8SZs",
            language: "en",
            types: "establishment",
          }}
        />
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
    </ScrollView>
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
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "tomato",
  },
  dateTime: {
    height: 40,
    marginHorizontal: "5%",
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "tomato",
  },
  dateTimePicker: {
    marginHorizontal: "5%",
  },
});
