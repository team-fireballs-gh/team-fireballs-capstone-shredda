import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { onSnapshot, collection } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebase/db";

const UserProfile = ({ displayName, photoURL, age, job, id }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.flatList, styles.shadow]}
      onPress={() => navigation.navigate("Messages", { displayName, photoURL, id })}
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
        <Text style={{ flexWrap: "wrap" }}>{job}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function PublicChat() {
  const [profiles, setProfiles] = useState([]);
  const [filter, setFilter] = useState(profiles);
  const [searching, setSearching] = useState(false);

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

  const renderItem = ({ item }) => (
    <UserProfile
      displayName={item.displayName}
      photoURL={item.photoURL}
      age={item.age}
      job={item.job}
      id={item.id}
    />
  );

  const search = (text) => {
    if (text) {
      setSearching(true);

      const temp = text.charAt(0).toUpperCase() + text.slice(1);
      const tempList = profiles.filter((item) => {
        if (item.displayName.match(temp)) return item.displayName;
      });

      setFilter(tempList);
    } else {
      setSearching(false);
      setFilter(profiles);
    }
  };

  return (
    <SafeAreaView>
      <View style={{ padding: 5 }}>
        <TextInput
          style={styles.search}
          placeholder="Search name"
          onChangeText={search}
          returnKeyType="done"
          blurOnSubmit={true}
        />
      </View>

      {searching ? (
        <FlatList
          style={styles.container}
          data={filter}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <FlatList
          style={styles.container}
          data={profiles}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
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
  search: {
    width: "100%",
    height: 40,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
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
    flex: 1,
  },
  name: {
    fontFamily: "Chalkduster",
    fontWeight: "400",
    fontSize: 20,
    paddingBottom: 5,
  },
});
