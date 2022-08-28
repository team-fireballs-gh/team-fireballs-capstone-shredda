import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

export default function Match() {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { loggedInProfile, userSwiped } = params;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.logo} source={require("../../assets/match.png")} />
      </View>

      <Text style={styles.text}>
        You and {userSwiped.displayName} have matched each other!
      </Text>

      <View style={styles.users} >
        <Image
          style={styles.image}
          source={{ uri: loggedInProfile.photoURL }}
        />
        <Image style={styles.image} source={{ uri: userSwiped.photoURL }} />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.goBack();
          navigation.navigate("Chats");
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          Send a message
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#FF998F",
    opacity: 0.9,
  },
  imageContainer: {
    justifyContent: "center",
    paddingTop: 20,
  },
  text: {
    paddingBottom: 30,
    color: "white",
    alignSelf: "center",
    fontSize: 32,
    textAlign: "center",
    margin: 8,
    fontStyle: "italic",
    fontFamily: "Party LET",
  },
  users: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 5,
  },
  image: {
    height: "30%",
    width: "30%",
    borderRadius: 50,
  },
  button: {
    position: "absolute",
    top: HEIGHT - 200,
    width: "80%",
    alignSelf: "center",
    backgroundColor: "#FFD9C7",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 100,
  },
  logo: {
    height: "28%",
    width: 330,
    alignSelf: "center",
    marginTop: 60,
  },
});
