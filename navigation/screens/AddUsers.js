import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { AntDesign, Ionicons, FontAwesome5 } from "react-native-vector-icons";
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
import { onSnapshot, doc, collection } from "firebase/firestore";

export default function AddUsers({ navigation }) {
  const [user] = useAuthState(auth);
  const [profiles, setProfiles] = useState([]);
  const swipeRef = useRef(0);

  useLayoutEffect(
    () =>
      // implicit return for unsubscribe purposes;
      onSnapshot(doc(db, "users", user.uid), (snapShot) => {
        if (!snapShot.exists()) {
          navigation.navigate("CreateProfile");
        }
      }),
    []
  );

  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      unsub = onSnapshot(collection(db, "users"), (snapshot) => {
        setProfiles(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
    };

    fetchCards();
    return unsub;
  }, []);

  console.log(profiles);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            style={{ height: 45, width: 45, borderRadius: 50 }}
            source={{ uri: profiles.photoUrl }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("updateUser")}>
          <FontAwesome5 name="user-edit" size={50} color="#fea7a5" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chats")}>
          <Ionicons name="chatbubbles-sharp" size={45} color="#fea7a5" />
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
          verticalSwipe={false} // so you only swipe left and right... NOT up and down;
          // we can set verticalSwipe to TRUE for a "super like feature?";
          onSwipedLeft={() => console.log("swiped left")} // you can a callback when swiping left || right;
          onSwipedRight={() => console.log("swiped right")}
          overlayLabels={{
            // to create labels when you're swiping left or right;
            left: {
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
