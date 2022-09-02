import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../firebase/db";
import IndividualUser from "./IndividualUser";

export default function PeopleList() {
    const [matches, setMatches] = useState([]);
    const [user] = useAuthState(auth);
  
    useEffect(
      () =>
        onSnapshot(
          query(
            collection(db, "matchedUsers"),
            // "array-contains" operator performs a complete match, so it only returns documents where the array contains the exact value you specified
            where("usersMatch", "array-contains", user.uid)
          ),
          (snapshot) =>
            setMatches(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
            )
        ),
      [user]
    );
  
    return matches.length > 0 ? (
      <FlatList
        style={styles.container}
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <IndividualUser userInfo={item} />}
      />
    ) : (
      <View style={{ padding: 5 }}>
        <Text style={styles.text}>No users at the moment..</Text>
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
      padding: 5
    },
  });