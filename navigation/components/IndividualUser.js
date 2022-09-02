import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/db";
import getMatchedUserInfo from "../helper/getMatchedInfo";

export default function IndividualUser({ userInfo }) {
  const navigation = useNavigation();
  const [user] = useAuthState(auth);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    let unsub;
    unsub = setUserDetails(getMatchedUserInfo(userInfo.users, user.uid));
    return unsub;
  }, [userInfo, user]);

  return (
    <TouchableOpacity
      style={[styles.container, styles.shadow]}
      onPress={() => navigation.navigate("User", { userInfo: userInfo })}
    >
      <Image
        style={styles.image}
        source={{ uri: userDetails?.photoURL }}
        height={70}
        width={70}
      />

      <View style={styles.textContainer}>
        <Text style={styles.name}>
          {userDetails?.displayName}, {userDetails?.age}
        </Text>
        <Text>{userDetails?.job}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFC7A8",
    flexDirection: "row",
    padding: 5,
  },
  image: {
    borderRadius: 50,
    padding: 10,
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
  textContainer: {
    justifyContent: "center",
    padding: 10,
  },
  name: {
    fontFamily: "Chalkduster",
    fontWeight: "400",
    fontSize: 20,
    paddingBottom: 5,
  },
});
