import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/db";
import { onSnapshot, query, collection, orderBy } from "firebase/firestore";
import getMatchedUserInfo from "../helper/getMatchedInfo";

export default function MoreChat({ matchInfo }) {
  const navigation = useNavigation();
  const [user] = useAuthState(auth);
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState("");

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matchedUsers", matchInfo.id, "messages"),
          orderBy("createdAt", "desc")
        ),
        (snapshot) => setLastMessage(snapshot.docs[0]?.data()?.text)
      )[(matchInfo, db)]
  );

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchInfo.users, user.uid));
  }, [matchInfo, user]);

  console.log(lastMessage);

  return (
    <TouchableOpacity
      style={[styles.container, styles.shadow]}
      onPress={() => navigation.navigate("Message", { matchInfo: matchInfo })}
    >
      {/* "optional chaining" the uri of the matchUserInfo because it might be 'undefine' at some point since we started with the value of null */}
      <Image
        style={styles.image}
        source={{ uri: matchedUserInfo?.photoURL }}
        height={70}
        width={70}
      />

      <View style={styles.textContainer}>
        <Text style={styles.name}>{matchedUserInfo?.displayName}</Text>
        <Text>{lastMessage || "Don't be shy. Say Hi! ☺️"}</Text>
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
