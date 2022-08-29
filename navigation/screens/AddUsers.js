import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { AntDesign, Ionicons } from "react-native-vector-icons";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/db";
import generateId from "../helper/getMatchedInfo";
import {
  onSnapshot,
  doc,
  collection,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

export default function AddUsers({ navigation }) {
  const [user] = useAuthState(auth);
  const [profiles, setProfiles] = useState([]);
  const [userData, setUserData] = useState(null);
  const swipeRef = useRef(0);

  /* get user data */
  const getUser = () => {
    let unsub;

    unsub = onSnapshot(doc(db, "users", user.uid), (snapShot) => {
      if (!snapShot.exists()) {
        console.log("User does not have a profile...");
      }
      setUserData(snapShot.data());
    });

    return unsub;
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

  useEffect(() => {
    let unsub;

    getUser();

    const fetchCards = async () => {
      // this grabs the users inside the "passes" collection
      const passes = await getDocs(
        collection(db, "users", user.uid, "passes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));
      // this grabs the users inside the "matches" collection
      const matches = await getDocs(
        collection(db, "users", user.uid, "matches")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      // if passes.length > 0, then we can use the "passes" variable; else pass in 'test' value -- this is because when you QUERY on the back end, you can't pass in an empty array. There has to be a value;
      const passedUsers = passes.length > 0 ? passes : ["🥯"];
      const matchedUsers = matches.length > 0 ? matches : ["🍆"];

      console.log([...passedUsers, ...matchedUsers]);
      unsub = onSnapshot(
        query(
          collection(db, "users"),
          // QueryConstraint -- "where" takes 3 parameters: a field to filter on, a comparison operator, and a value;
          where("id", "not-in", [...passedUsers, ...matchedUsers]) // query the "id" where the id is not pressent in the user's passes/matches collection
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id !== user.uid) // this is to make sure that you don't see youy own profile on the swipable cards
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };

    fetchCards();
    return unsub;
  }, [db]);

  /* Swiping left */
  const swipeLeft = (cardIndex) => {
    // "profiles" grabs all the users that you're able to swipe on
    if (!profiles[cardIndex]) return; // edge case; do anything if the cardIndex is not in the profiles

    // this grabs the user on that card you swiped left on
    const userSwiped = profiles[cardIndex];
    console.log(`You passed on ${userSwiped.displayName}`);

    // after swiping left on that user, that user will be put inside a collection named "passes" that is specific to your user;
    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };

  /* Swiping right */
  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return; // not do anything

    const userSwiped = profiles[cardIndex];
    const loggedInProfile = await (
      await getDoc(doc(db, "users", user.uid))
    ).data();

    // this is a bit on the "sketchy" side because we're practically invading the other user's "matches" collection info -- could probably be better if put inside a "Cloud Function" for privacy reasons;
    getDoc(doc(db, "users", userSwiped.id, "matches", user.uid)).then(
      // check the OTHER user's "matches" collection and if your 'uid' is there, then they swiped right on you;
      (docsnap) => {
        // you'll get a snapshot of that document
        if (docsnap.exists()) {
          console.log(
            `Ooooohhhh ${userSwiped.displayName} is interested in you 😍!`
          );

          setDoc(
            doc(db, "users", user.uid, "matches", userSwiped.id),
            userSwiped
          );

          // create a MATCH between you and the other user;
          setDoc(doc(db, "matchedUsers", generateId(user.uid, userSwiped.id)), { // "generateId" this is a helper function to make sure the your 'uid' goes before the other user's 'id'
            users: {
              // to help with searches
              [user.uid]: loggedInProfile,
              [userSwiped.id]: userSwiped,
            },
            usersMatch: [user.uid, userSwiped.id],
            timestamp: serverTimestamp(),
          });

          // if there's a match, navigate to "Match" screen
          navigation.navigate("Match", {
            loggedInProfile,
            userSwiped,
          });
        } else {
          // first interaction between users..
          console.log(`You're interested in ${userSwiped.displayName} 😉.`);
          setDoc(
            doc(db, "users", user.uid, "matches", userSwiped.id),
            userSwiped
          );
        }
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          {userData ? (
            <Image
              style={{ height: 55, width: 55, borderRadius: 50 }}
              source={{ uri: userData.photoURL }}
            />
          ) : null}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chats")}>
          <Ionicons name="chatbubbles-sharp" size={55} color="#fea7a5" />
        </TouchableOpacity>
      </View>
      {/* User Cards */}
      <View style={styles.swiperContainer}>
        <Swiper
          ref={swipeRef}
          containerStyle={styles.cardContainer}
          cards={profiles}
          stackSize={5} // so you can actually see 5 cards stacked together;
          cardIndex={0} // so the card will always start at the very first person on the list;
          animateCardOpacity // when you're swiping, the card becomes transparent;
          verticalSwipe={false} // so you only swipe left and right... NOT up and down set verticalSwipe to TRUE for a "super like feature?";
          onSwipedLeft={(cardIndex) => {
            console.log("swiped left");
            swipeLeft(cardIndex);
          }} // this returns the cardIndex;
          onSwipedRight={(cardIndex) => {
            console.log("swiped right");
            swipeRight(cardIndex);
          }}
          overlayLabels={{
            left: {
              // to create labels when you're swiping left or right;
              title: "🤔",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  color: "#00F763",
                },
              },
            },
          }}
          renderCard={(card) =>
            card ? (
              <View key={card.uid} style={[styles.eachCard, styles.shadow]}>
                <Image
                  style={styles.imageStyle}
                  source={{ uri: card.photoURL }}
                />

                <View style={styles.cardInfo}>
                  <View>
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                      {card.displayName}
                    </Text>
                    <Text style={{ flexWrap: "wrap", width: "60%" }}>
                      {card.job}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 25,
                      position: "absolute",
                      left: "90%",
                    }}
                  >
                    {card.age}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={[styles.noProfile, styles.shadow]}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    justifyContent: "center",
                  }}
                >
                  No more profiles!
                </Text>
                <Image
                  style={{ justifyContent: "center" }}
                  height={250}
                  width={250}
                  source={require("../../assets/sad-emoji.png")}
                />
              </View>
            )
          }
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.circle, { backgroundColor: "#FFCCCC" }]}
          onPress={() => swipeRef.current.swipeLeft()} // comes from useRef() which contains a .current property which can hold a mutable value (Objects whose value can change);
        >
          <AntDesign name="close" size={30} color="#FF3D66" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.circle, { backgroundColor: "#C2FFD6" }]}
          onPress={() => swipeRef.current.swipeRight()}
        >
          <AntDesign name="heart" size={30} color="#00AD5F" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
    paddingTop: 10,
  },
  swiperContainer: {
    flex: 1,
  },
  cardContainer: {
    backgroundColor: "transparent",
  },
  eachCard: {
    position: "relative",
    top: -50,
    backgroundColor: "beige",
    height: "70%",
    borderRadius: 20,
  },
  noProfile: {
    position: "relative",
    backgroundColor: "#EDE6E8",
    justifyContent: "center",
    alignItems: "center",
    height: "70%",
    borderRadius: 20,
    top: -50,
  },
  imageStyle: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
  },
  cardInfo: {
    position: "absolute",
    backgroundColor: "#FFD9C7",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingLeft: 15,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 20,
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
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 15,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 32,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "gray",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});