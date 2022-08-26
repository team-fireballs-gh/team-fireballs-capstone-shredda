import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function CreateProfile({ navigation }) {
  let [name, setName] = useState("")
  return (
    <View style={styles.container}>
      <Text>What's your name?</Text>
      <TextInput 
        style={styles.input}
        value={name}
        onChangeTest={setName}
        placeholder="First Name"
      />
      <Pressable>
        <AntDesign name="rightcircleo" size={40} color="green"
          onPress={() => navigation.navigation("Friends")}
        />
      </Pressable>

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
    fontSize: 16,
    marginLeft: "5%",
    marginRight: "10%",
    borderWidth: 2,
    padding: 5,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderColor: 'tomato',
    height: 150,
},
});
