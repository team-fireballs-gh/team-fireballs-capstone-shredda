import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Platform,
  Alert,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/db";
import { InterestPicker } from "./helper/InterestPicker";

export default function Chats({ navigation }) {
  const [user] = useAuthState(auth);

  const [image, setImage] = useState(null);
  const [chooseInterest, setChooseInterest] = useState("Select interest...");
  const [interestVisibility, setinterestVisibility] = useState(false);

  const changeModalVisibility = (bool) => {
    setinterestVisibility(bool);
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

      <ScrollView>
        <Text>Profile Picture</Text>
        <Button title="Upload Image" onPress={pickImage} />
        {!image ? (
          <Image
            source={{ uri: user.photoURL }}
            style={{ width: 200, height: 200 }}
          />
        ) : (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
        <Text>Interests</Text>
        <TouchableOpacity style={{ backgroundColor: "white", alignSelf: "stretch", paddingHorizontal: 20, marginHorizontal: 20 }} onPress={() => changeModalVisibility(true)}>
          <Text style={{ marginVertical: 20 }} >{chooseInterest}</Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="fade"
          visible={interestVisibility}
          nRequestClose={() => changeModalVisibility(false)}
        >
          <InterestPicker
            changeModalVisibility={changeModalVisibility}
            setData={setData}
          />
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
})