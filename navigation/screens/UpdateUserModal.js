import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  Platform,
  Alert,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/db";

const INTERESTS = [
  "Food",
  "Music",
  "Travel",
  "Sports",
  "Television",
  "Camping",
  "Exercise",
  "Dancing",
  "Art",
  "Cooking",
  "Video Games",
];
const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const InterestPicker = (props) => { // for interests selector;
  const onPressInterest = (option) => {
    props.changeModalVisibility(false);
    props.setData(option);
  };
  const option = INTERESTS.map((interest, i) => {
    return (
      <TouchableOpacity
        style={{ alignItems: "flex-start" }}
        key={i}
        onPress={() => onPressInterest(interest)}
      >
        <Text style={{ margin: 20, fontSize: 20, fontWeight: "bold" }}>
          {interest}
        </Text>
      </TouchableOpacity>
    );
  });

  return (
    <TouchableOpacity
      onPress={() => props.changeModalVisibility(false)}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View
        style={{
          backgroundColor: "#FFD6A1",
          borderRadius: 10,
          width: WIDTH - 180,
          height: HEIGHT - 300,
        }}
      >
        <ScrollView>{option}</ScrollView>
      </View>
    </TouchableOpacity>
  );
};

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
});
