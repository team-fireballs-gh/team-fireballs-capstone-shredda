import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { db } from "../../firebase/db";
import useAuth from "../../auth";
import { useRoute } from "@react-navigation/native";
import getMatchedUserInfo from "../helper/getMatchedInfo";

export default function UserProfile({ navigation }) {
  const { user } = useAuth();
  const { params } = useRoute();
  const { userInfo } = params;

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    let unsub;
    unsub = setUserData(getMatchedUserInfo(userInfo.users, user.uid));
    return unsub;
  }, [userInfo, user]);

  console.log(userData);

  return (
    <SafeAreaView style={[{ flex: 1 }]}>
      {userData ? (
        <>
          <View style={styles.profileContainer}>
            <ImageBackground
              style={styles.backgroundImage}
              source={{
                uri: "https://media.istockphoto.com/photos/forest-wooden-table-background-summer-sunny-meadow-with-green-grass-picture-id1353553203?b=1&k=20&m=1353553203&s=170667a&w=0&h=QTyTGI9tWQluIlkmwW0s7Q4z7R_IT8egpzzHjW3cSas=",
              }}
            ></ImageBackground>

            <Image
              style={styles.profilePic}
              source={{
                uri:
                  userData.photoURL ||
                  "https://www.kindpng.com/picc/m/70-706576_anime-kawaii-pollito-animeboy-cute-manga-freetoedit-profile.png",
              }}
            ></Image>
            <Text style={styles.name}>
              {userData.displayName}, {userData.age}, {userData.pronouns}
            </Text>
          </View>
          <ScrollView style={styles.scrollView}>
            <View style={styles.textContainer}>
              <Text style={styles.header}>About Me</Text>
              <Text style={styles.content}>{userData.aboutMe}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.header}>Birthday</Text>
              <Text style={styles.content}>{userData.birthday}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.header}>Interests</Text>
              <Text style={styles.content}>
                {Object.keys(userData.interests)
                  .filter((key) => userData.interests[key] === true)
                  .join(", ")}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.header}>Looking for</Text>
              <Text style={styles.content}>
                {Object.keys(userData.userType)
                  .filter((key) => userData.userType[key] === true)
                  .join(", ")}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.header}>Sexuality</Text>
              <Text style={styles.content}>{userData.sexuality}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.header}>Gender Identity</Text>
              <Text style={styles.content}>{userData.genderIdentity}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.header}>Occupation</Text>
              <Text style={styles.content}>{userData.job}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.header}>Education</Text>
              <Text style={styles.content}>{userData.education}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.header}>Smoker 🚬</Text>
              <Text style={styles.content}>{userData.smoker}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.header}>Alcohol 🥃</Text>
              <Text style={styles.content}>{userData.drinker}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.header}>Political views</Text>
              <Text style={styles.content}>{userData.politicalViews}</Text>
            </View>
          </ScrollView>
        </>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    height: "40%",
    width: "100%",
    backgroundColor: "#E3DA9F",
    elevation: 4,
  },
  backgroundImage: {
    height: "85%",
    width: "100%",
  },
  profilePic: {
    height: "60%",
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
    top: 15,
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
