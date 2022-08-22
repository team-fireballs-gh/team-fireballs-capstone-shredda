import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import useAuth from "../../auth";

export default function Login({ navigation }) {
  let [text, setText] = useState("");
  let [password, setPassword] = useState("");
  
  const { signInWithGoogle } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.loginWelcome}>Welcome To Your Community</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="email"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="password"
        secureTextEntry={true}
      />
      <View style={styles.buttonRow}>
        <Pressable
          style={styles.registerButton}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>

        <Pressable
          style={styles.loginButton}
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
      <Pressable
        style={styles.loginButton}
        onPress={signInWithGoogle}
      >
        <Ionicons name="logo-google" color="white" size={20} />
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 200,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "80%",
    borderRadius: 10,
    fontSize: 20,
  },
  buttonRow: {
    flexDirection: "row",
  },
  loginButton: {
    backgroundColor: "tomato",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10,
    borderRadius: 10,
  },
  registerButton: {
    backgroundColor: "#4f6cff",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    justifyContent: "center",
    fontSize: 18,
  },
  loginWelcome: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 10,
  },
});
