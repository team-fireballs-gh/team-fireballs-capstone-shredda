import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";

const ProfileView = () => {
  return (
    <View style={styles.container}>
      <View style={styles.usernameAndProfilePic}>
        <Text>Username</Text>
        <Image source={require("../../assets/favicon.png")} />
      </View>
      <Button title="Edit Profile" />
      <View>
        <Text>About Me</Text>
      </View>
      <View>
        <Text>My Interests</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  usernameAndProfilePic: {
    flexDirection: "row",
  },
});

export default ProfileView;
