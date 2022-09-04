import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Button,
  Pressable,
  FlatList,
  Image,
  ActivityIndicator
} from "react-native";
import {
  addEvent,
  getAllEvents,
} from "../../redux/reducers/events/eventsReducer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage } from "../../firebase/db";
import DatePickerIOS from "@react-native-community/datetimepicker";
import AntIcon from "react-native-vector-icons/AntDesign";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env"
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";




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

  const [image, setImage] = useState(null); // for profile picture
  const [uploading, setUploading] = useState(false);
  

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
      imageUrl: image
    };
    await addEvent(eventToAdd);
    dispatch(getAllEvents());
    navigation.goBack("Discover");
  };

  const pickImage = async () => {
    // for image
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const url = await uploadImage(result.uri);
      console.log("😄", url);
      setUploading(false);
      setImage(url);
    }
  };

  // uploading image to firebase storage
  const uploadImage = async (image) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    const storageRef = ref(storage, new Date().toISOString());

    await uploadBytes(storageRef, blob).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      setUploading(true);
    });

    blob.close();
    return await getDownloadURL(storageRef);
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
        
        {/* <GooglePlacesAutocomplete
          placeholder="Description"
          onChangeText={setEventAddress}
          onPress={(data, details = null) => {
            console.log(data, details);
            console.log("COORDINATES", details.geometry.location);
            console.log("name", data.description)
            
          }}
          fetchDetails={true}
          query={{
            key:'AIzaSyAcboHxUI2XRIfsHXv6GUNExGHAaAu8SZs',
            language: "en",
            types: "establishment",
          }}
        /> */}
          <Text style={styles.header}>Upload an Image!</Text>          
          {!uploading ? (
            <Button title="Upload Image" onPress={pickImage} />
          ) : (
            <ActivityIndicator size="large" color="#000" />
          )}
          {!image ? (
            <Image
              source={{ uri: user.photoURL }}
              style={{ width: 200, height: 200, alignSelf: "center" }}
            />
          ) : (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200, alignSelf: "center" }}
            />
          )}
        {/* <View style={styles.individualContainer}>
          <Text style={styles.header}>External Link</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEventLink}
            placeholder="Website Link"
          />
        </View> */}

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
