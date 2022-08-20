import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function UserProfile() {
  return (
    <View style={styles.container}>
      <Text>You're on the UserProfile file!</Text>
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
});
