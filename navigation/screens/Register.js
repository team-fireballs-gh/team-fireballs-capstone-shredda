import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import db from "../../firebase/db";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth();

export default function Login({ navigation }) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");

  const registerUser = () => {
    if (email === "" && password === "") {
      alert("Enter details to signup!");
    } else if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log("User registered successfully!");
          setEmail("");
          setPassword("");

          navigation.navigate("CreateProfile");
        })
        .catch((error) => console.error(error));
    } else if (password !== confirmPassword) {
      alert("Password do not match. Try again.");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginWelcome}>Register</Text>
      <Text style={styles.inputHeader}>email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="email@email.com"
      />
      <Text style={styles.inputHeader}>password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="password"
        secureTextEntry="true"
      />
      <Text style={styles.inputHeader}>confirm password</Text>
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="confirm password"
        secureTextEntry="true"
      />
      <View style={styles.buttonRow}>
        <Pressable style={styles.registerButton} onPress={registerUser}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 30,
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
  inputHeader: {
    alignSelf: "left",
    color: "#4f6cff",
    left: "10%",
    fontSize: 18,
  },
});
