import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn";
import { Ionicons, Foundation } from "react-native-vector-icons";

export default function Header({ title, callEnabled }) {
  const navigation = useNavigation();
  const tw = useTailwind();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back-circle-outline"
            size={40}
            color="#FF8257"
          />
        </TouchableOpacity>
        <Text style={styles.text}>{title}</Text>
      </View>

      {callEnabled && (
        <TouchableOpacity style={styles.phoneContainer}>
          <Foundation
            style={styles.phone}
            name="telephone"
            size={40}
            color="red"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    paddingLeft: 5,
    fontSize: 25,
  },
  phoneContainer: {
    borderRadius: 50,
    backgroundColor: "#FFD9C7",
    width: 50,
    height: 40,
    alignSelf: "flex-end",
  },
  phone: {
    position: "relative",
    left: 10,
  },
});
