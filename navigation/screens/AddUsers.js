import { StatusBar } from "expo-status-bar";
import react from "react";
import AntIcon from "react-native-vector-icons/AntDesign";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Button,
  Alert,
  Platform,
  Dimensions,
} from "react-native";
import { useDimensions } from "@react-native-community/hooks";

export default function AddUsers({ navigation }) {
  // console.log(Dimensions.get("screen"));
  // console.log(useDimensions());

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.imageContainer}>
        <View>
          <Image
            style={{
              height: 130,
              width: "100%",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
            source={{
              uri: "https://media.istockphoto.com/photos/forest-wooden-table-background-summer-sunny-meadow-with-green-grass-picture-id1353553203?b=1&k=20&m=1353553203&s=170667a&w=0&h=QTyTGI9tWQluIlkmwW0s7Q4z7R_IT8egpzzHjW3cSas=",
            }}
          />
        </View>

        <View style={styles.profilePic}>
          <Image
            style={{ height: "100%", width: "100%", borderRadius: "50%" }}
            source={{
              uri: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/41822045014839.5824bf369f54b.jpg",
            }}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.text}>Shauna, The Queen</Text>

          <Text style={{ color: "#9597A1" }}>
            Pronouns, Interests, Tag line/ first impression
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.circle}>
          <AntIcon name="close" size={35} color="#FFC1CB" />
        </View>
        <View style={styles.circle}>
          <AntIcon name="hearto" size={35} color="#EB5559" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "beige",
    justifyContent: "space-evenly",
    // alignItems: 'center',

    // padding: Platform.OS === "ios" ? StatusBar.currentHeight : 0,
  },
  imageContainer: {
    height: 430,
    width: 345,
    backgroundColor: "white",
    borderRadius: 21,
    elevation: 4,
    marginLeft: 23,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  profilePic: {
    height: 135,
    width: 140,
    alignSelf: "center",
    position: "absolute",
    top: 75,
  },
  textContainer: {
    height: 45,
    width: "100%",
    position: "absolute",
    top: 200,
    alignItems: "center",
  },
  text: {
    alignSelf: "center",
    fontSize: 15,
    lineHeight: 48,
    fontWeight: "bold",
  },
});
