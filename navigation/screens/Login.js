import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default function Login({ navigation }) {
  let [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <Text>Welcome To Your Community</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="username"
      />
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="password"
      />
      <Button
        title="Log In"
        onPress={() => navigation.navigate("MainContainer")}
      />
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
