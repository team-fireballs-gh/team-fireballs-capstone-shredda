import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTailwind } from "tailwind-rn/dist";
import { auth } from "../../firebase/db";
import getMatchedUserInfo from "../helper/getMatchedInfo";

export default function MoreChat({ matchInfo }) {
  const navigation = useNavigation();
  const tw = useTailwind();
  const [user] = useAuthState(auth);
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchInfo.users, user.uid));
  }, [matchInfo, user]);

  console.log(matchedUserInfo);

  return (
    <TouchableOpacity style={[styles.container, styles.shadow]}>
      {/* "optional chaining" the uri of the matchUserInfo because it might be 'undefine' at some point since we started with the value of null */}
      <Image
        style={tw("rounded-full h-16 w-16 mr-4")}
        source={{ uri: matchedUserInfo?.photoURL }}
        height={80}
        width={80}
      />

      <View style={styles.textContainer}>
        <Text style={styles.text}>{matchedUserInfo?.displayName}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
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
  text: {
    fontFamily: "Chalkduster",
    fontWeight: "400",
  },
});
