import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Platform,
  Alert,
  Button,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  Pressable,
} from "react-native";
import CheckBox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/db";
import { InterestPicker } from "./helper/updateUserHelperFuncs";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "react-native-vector-icons";

const WIDTH = Dimensions.get("screen").width;
// const HEIGHT = Dimensions.get("screen").height;

export default function Chats({ navigation }) {
  const [user] = useAuthState(auth);

  const [image, setImage] = useState(null); // for profile picture

  const [chooseInterest, setChooseInterest] = useState("Select interest..."); // for interests;
  const [isVisible, setisVisible] = useState(false);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [text, setText] = useState(null);

  const [isSolo, setSolo] = useState(false);
  const [isRomance, setRomance] = useState(false);
  const [isFriendship, setFriendship] = useState(false);

  const changeModalVisibility = (bool) => {
    setisVisible(bool);
  };

  const setData = (option) => {
    setChooseInterest(option);
  };

  useEffect(async () => {
    if (Platform !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync(); // to interact with the permissions;
      if (status !== "granted") {
        Alert.alert("Status", "Permission denied!", [
          {
            text: "Understood",
            onPress: () => console.log("I guess you understood."),
          },
        ]);
      }
    }
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const onChange = (e, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let formattedDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setText(formattedDate);
    setShow(false);
  };

  const showMode = (current) => {
    setShow(true);
    setMode(current);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{ height: 100, width: "100%" }}
        resizeMode="contain"
        source={require("../../assets/fireball.png")}
      />
      <Text
        style={{ textAlign: "center", fontWeight: "bold", color: "#FF690A" }}
      >
        Welcome {user.displayName}!
      </Text>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="position"
        enabled={true}
      >
        <ScrollView>
          <Text>Profile Picture</Text>
          <Button title="Upload Image" onPress={pickImage} />
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

          <Text>Interests</Text>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              alignSelf: "stretch",
              paddingHorizontal: 20,
              marginHorizontal: 20,
            }}
            onPress={() => changeModalVisibility(true)}
          >
            <Text style={{ marginVertical: 20 }}>{chooseInterest}</Text>
          </TouchableOpacity>
          <Modal
            transparent={true}
            animationType="fade"
            visible={isVisible}
            nRequestClose={() => changeModalVisibility(false)}
          >
            <InterestPicker
              changeModalVisibility={changeModalVisibility}
              setData={setData}
            />
          </Modal>

          <Text>About Me</Text>
          <ScrollView>
            <TextInput
              style={styles.text}
              multiline={true}
              numberOfLines={15}
              // keyboardType="numeric"
              blurOnSubmit={true}
              placeholder="Let us get to know you!"
              returnKeyType="done"
            />
          </ScrollView>

          <Text style={{ paddingTop: 10 }}>Birthday</Text>
          <Text style={{ fontWeight: "bold", fontSize: 18, paddingBottom: 10 }}>
            {text}
          </Text>

          <Pressable style={styles.calendar} onPress={() => showMode("date")}>
            <Ionicons
              style={{
                backgroundColor: "#FFC7A8",
              }}
              name="calendar-sharp"
              size={30}
              color="tomato"
            />
          </Pressable>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
              autoclose={true}
            />
          )}

          <Text>Drinker?</Text>
          <TextInput
            style={{ backgroundColor: "beige" }}
            returnKeyType="done"
            blurOnSubmit={true}
          />

          <Text>Smoker?</Text>
          <TextInput
            style={{ backgroundColor: "beige" }}
            returnKeyType="done"
            blurOnSubmit={true}
          />

          <Text>Education</Text>
          <TextInput
            style={{ backgroundColor: "beige" }}
            returnKeyType="done"
            blurOnSubmit={true}
          />

          <Text>Email</Text>
          <Text style={{ backgroundColor: "beige" }}>{user.email}</Text>

          <Text>Gender Identity</Text>
          <TextInput
            style={{ backgroundColor: "beige" }}
            returnKeyType="done"
            blurOnSubmit={true}
          />

          <Text>Pronouns</Text>
          <TextInput
            style={{ backgroundColor: "beige" }}
            returnKeyType="done"
            blurOnSubmit={true}
          />

          <Text>Sexuality</Text>
          <TextInput
            style={{ backgroundColor: "beige" }}
            returnKeyType="done"
            blurOnSubmit={true}
          />

          <Text>UserType</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <CheckBox
              disabled={false}
              value={isSolo}
              onValueChange={setSolo}
              // onChange={}
            />
            <Text>solo</Text>

            <CheckBox
              disabled={false}
              value={isRomance}
              onValueChange={setRomance}
              // onChange={}
            />
            <Text>romance</Text>

            <CheckBox
              disabled={false}
              value={isFriendship}
              onValueChange={setFriendship}
              // onChange={}
            />
            <Text>friendship</Text>
          </View>

          <Text>Job title</Text>
          <TextInput
            style={{ backgroundColor: "beige" }}
            returnKeyType="done"
            blurOnSubmit={true}
          />

          <Text>Political views</Text>
          <TextInput
            style={{ backgroundColor: "beige" }}
            returnKeyType="done"
            blurOnSubmit={true}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  text: {
    flexWrap: "wrap",
    fontSize: 14,
    width: WIDTH - 40,
    backgroundColor: "beige",
    alignItems: "flex-start",
  },
  calendar: {
    backgroundColor: "pink",
    width: 50,
    height: 50,
    borderRadius: 16,
    padding: 10,
    justifyContent: "center",
    shadowColor: "gray",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    position: "relative",
    left: "68%",
    top: "-5%",
  },
});
