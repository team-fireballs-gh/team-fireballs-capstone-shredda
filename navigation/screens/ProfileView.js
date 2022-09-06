import React, { useEffect, useState, useLayoutEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { doc, onSnapshot } from "firebase/firestore";
import { Feather } from "react-native-vector-icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../firebase/db";
import useAuth from "../../auth";

const ProfileView = ({ navigation }) => {
  const { logout } = useAuth();
  const [user] = useAuthState(auth);

  const [loggedin, setLoggedin] = useState(null);

  const logOutButton = () => {
    logout();
  };

  useLayoutEffect(
    () =>
      // implicit return for unsubscribe purposes;

      // this allows you the grab the latest update on the users collection
      onSnapshot(doc(db, "users", user.uid), (snapShot) => {
        if (!snapShot.exists()) {
          navigation.navigate("CreateProfile");
        }
      }),
    []
  );

  useLayoutEffect(
    () =>
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={styles.top}
            title="logout"
            onPress={logOutButton}
          >
            <Feather name="log-out" size={30} color="#506700" />
          </TouchableOpacity>
        ),
        headerTintColor: "#DBE3BF",
        headerStyle: {
          backgroundColor: "#ABB573",
        },
      }),
    []
  );

  useEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapShot) => {
        if (!snapShot.exists()) {
          console.log("User does not have a profile...");
        }
        // setLoggedin(snapShot);
        setLoggedin(snapShot.data());
      }),
    []
  );

  // console.log("🍌", loggedin);

  return (
    <SafeAreaView style={[{ flex: 1 }]}>
      {loggedin ? (
        <>
          <View style={styles.profileContainer}>
            <ImageBackground
              style={styles.backgroundImage}
              source={{
                uri:
                  loggedin.bgImg ||
                  "https://media.istockphoto.com/photos/forest-wooden-table-background-summer-sunny-meadow-with-green-grass-picture-id1353553203?b=1&k=20&m=1353553203&s=170667a&w=0&h=QTyTGI9tWQluIlkmwW0s7Q4z7R_IT8egpzzHjW3cSas=",
              }}
            ></ImageBackground>
            <TouchableOpacity
              style={styles.edit}
              onPress={() => navigation.navigate("updateUser")}
            >
              <Feather name="edit" size={20} color="#fea7a5" />
            </TouchableOpacity>
            <Image
              style={styles.profilePic}
              source={{
                uri:
                  loggedin.photoURL ||
                  "https://www.kindpng.com/picc/m/70-706576_anime-kawaii-pollito-animeboy-cute-manga-freetoedit-profile.png",
              }}
            ></Image>
            <Text style={styles.name}>
              {loggedin.displayName}, {loggedin.age}, {loggedin.pronouns}
            </Text>
          </View>
          <ScrollView style={styles.scrollView}>
            <View style={styles.textContainer}>
              <Text style={styles.header}>About Me</Text>
              <Text style={styles.content}>{loggedin.aboutMe}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.header}>Birthday</Text>
              <Text style={styles.content}>{loggedin.birthday}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.header}>Interests</Text>
              <Text style={styles.content}>
                {Object.keys(loggedin.interests)
                  .filter((key) => loggedin.interests[key] === true)
                  .join(", ")}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.header}>Looking for</Text>
              <Text style={styles.content}>
                {Object.keys(loggedin.userType)
                  .filter((key) => loggedin.userType[key] === true)
                  .join(", ")}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.header}>Sexuality</Text>
              <Text style={styles.content}>{loggedin.sexuality}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.header}>Gender Identity</Text>
              <Text style={styles.content}>{loggedin.genderIdentity}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.header}>Occupation</Text>
              <Text style={styles.content}>{loggedin.job}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.header}>Education</Text>
              <Text style={styles.content}>{loggedin.education}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.header}>Smoker 🚬</Text>
              <Text style={styles.content}>{loggedin.smoker}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.header}>Alcohol 🥃</Text>
              <Text style={styles.content}>{loggedin.drinker}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.header}>Political views</Text>
              <Text style={styles.content}>{loggedin.politicalViews}</Text>
            </View>
          </ScrollView>
        </>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    height: "43%",
    width: "100%",
    backgroundColor: "#E3DA9F",
    elevation: 4,
    paddingBottom: 10,
  },
  backgroundImage: {
    height: "90%",
    width: "100%",
  },
  edit: {
    position: "relative",
    top: -10,
    left: "22%",
    alignSelf: "center",
  },
  profilePic: {
    height: "65%",
    width: "40%",
    alignSelf: "center",
    position: "absolute",
    top: "25%",
    borderRadius: 55,
  },
  name: {
    fontSize: 17,
    fontWeight: "bold",
    alignSelf: "center",
    top: -10,
  },
  header: {
    fontWeight: "bold",
    paddingTop: 10,
    paddingLeft: 5,
  },
  top: {
    paddingRight: 10,
  },
  scrollView: {
    backgroundColor: "#E8EDD6",
  },
  textContainer: {
    paddingBottom: 10,
  },
  content: {
    padding: 10,
  },
});

export default ProfileView;
