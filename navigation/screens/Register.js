import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import db from "../../firebase/db";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/reducers/users/usersReducer";
export default function Register({ navigation }) {
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const auth = getAuth(db);

  const registerUser = () => {

    if (email === "" && password === "") {
      alert("Enter details to signup!");
    } else if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          let user = { email: email, username: username };
          dispatch(addUser(res.user.uid, user));
          alert("User registered successfully!");

          navigation.navigate("CreateProfile");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode);
        });
    } else if (password !== confirmPassword) {
      alert("Password do not match. Try again.");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <ImageBackground
      resizeMode="cover"
      source={{
        uri: "https://cdn.pixabay.com/photo/2015/10/09/12/27/soft-979158_1280.jpg",
      }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.loginWelcome}>Register</Text>
        <Text style={styles.inputHeader}>username</Text>
        <TextInput
          style={[styles.input, styles.shadow]}
          value={username}
          onChangeText={setUsername}
          placeholder="username"
        />
        <Text style={styles.inputHeader}>email</Text>
        <TextInput
          style={[styles.input, styles.shadow]}
          value={email}
          onChangeText={setEmail}
          placeholder="email@email.com"
        />
        <Text style={styles.inputHeader}>password</Text>
        <TextInput
          style={[styles.input, styles.shadow]}
          value={password}
          onChangeText={setPassword}
          placeholder="password"
          secureTextEntry={true}
        />
        <Text style={styles.inputHeader}>confirm password</Text>
        <TextInput
          style={[styles.input, styles.shadow]}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="confirm password"
          secureTextEntry={true}
        />
        <View style={styles.buttonRow}>
          <Pressable
            style={[styles.registerButton, styles.shadow]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Back</Text>
          </Pressable>

          <Pressable
            style={[styles.registerButton, styles.shadow]}
            onPress={registerUser}
          >
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderColor: "#A1B5A8",
  },
  buttonRow: {
    flexDirection: "row",
    paddingBottom: 10,
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
    backgroundColor: "#FF8C99",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 15,
    borderRadius: 15,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    justifyContent: "center",
    fontSize: 18,
  },
  loginWelcome: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Papyrus",
  },
  inputHeader: {
    color: "#FF998F",
    fontSize: 32,
    fontFamily: "Party LET",
  },
  back: {
    paddingLeft: 15,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.45,
    elevation: 2,
  },
});
