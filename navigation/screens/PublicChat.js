import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { onSnapshot, collection } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../auth";
import { db } from "../../firebase/db";

const UserProfile = ({ displayName, photoURL, age, job }) => (
  <TouchableOpacity
    style={[styles.flatList, styles.shadow]}
    //   onPress={() => navigation.navigate("User", { userInfo: userInfo })}
  >
    <Image
      style={styles.image}
      source={{
        uri:
          photoURL ||
          "https://www.kindpng.com/picc/m/70-706576_anime-kawaii-pollito-animeboy-cute-manga-freetoedit-profile.png",
      }}
      height={70}
      width={70}
    />

    <View style={styles.textContainer}>
      <Text style={styles.name}>
        {displayName}, {age}
      </Text>
      <Text>{job}</Text>
    </View>
  </TouchableOpacity>
);

export default function PublicChat() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    let unsubscribe;

    const fetchUsers = async () => {
      unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
        setProfiles(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
    };

    fetchUsers();
    return unsubscribe;
  }, []);

  // console.log(profiles);

  const renderItem = ({ item }) => (
    <UserProfile
      displayName={item.displayName}
      photoURL={item.photoURL}
      age={item.age}
      job={item.job}
    />
  );

  return profiles.length > 0 ? (
    <FlatList
      style={styles.container}
      data={profiles}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  ) : (
    <View style={{ padding: 5 }}>
      <Text style={styles.text}>No users...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFD9C7",
    height: "100%",
  },
  text: {
    color: "red",
    fontSize: 22,
    padding: 5,
  },
  flatList: {
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
