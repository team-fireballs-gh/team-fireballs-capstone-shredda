import React, { useRef } from "react";
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

const Dummy_Data = [
  {
    displayName: "Sommer Ray",
    job: "Influencer",
    photoURL:
      "https://www.lifeandstylemag.com/wp-content/uploads/2018/12/058703039872_10-e1545171758516.jpg?resize=940%2C529&quality=86&strip=all",
    age: 25,
    uid: 13,
  },
  {
    displayName: "Scarlett Johansson",
    job: "Actress",
    photoURL:
      "https://m.media-amazon.com/images/M/MV5BMTM3OTUwMDYwNl5BMl5BanBnXkFtZTcwNTUyNzc3Nw@@._V1_.jpg",
    age: 37,
    uid: 15,
  },
  {
    displayName: "Boberty Ton",
    job: "Instructor at Fullstack Academy",
    photoURL:
      "https://ca.slack-edge.com/T024FPYBQ-U033R8PS4MN-a1075cbb5839-512",
    age: 25,
    uid: 11,
  },
  {
    displayName: "Angelina Jolie",
    job: "Actress",
    photoURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2005-1565016334.jpg",
    age: 47,
    uid: 17,
  },
  {
    displayName: "Cara Delevingne",
    job: "Supermodel",
    photoURL:
      "https://www.suntiros.com/wp-content/uploads/2021/02/Cara-Delevingne-Makeup-Pictures.jpg",
    age: 30,
    uid: 19,
  },
  {
    displayName: "Colson Baker",
    job: "Rapper",
    photoURL:
      "https://www.popkiller.pl/sites/default/files/images/mgk-2019.jpg",
    age: 32,
    uid: 21,
  },
  {
    displayName: "Alec Friedman",
    job: "Lead Web Development Instructor at Fullstack Academy",
    photoURL:
      "https://ca.slack-edge.com/T024FPYBQ-U033D99P960-2d5d5c907d83-512",
    age: "👀",
    uid: 23,
  },
];

export default function AddUsers({ navigation }) {
  const swipeRef = useRef(null);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chatBubble}>
        <TouchableOpacity onPress={() => navigation.navigate("Chats")}>
          <Ionicons name="chatbubbles-sharp" size={45} color="#fea7a5" />
        </TouchableOpacity>
      </View>
      {/* User Cards */}
      <View style={styles.swiperContainer}>
        <Swiper
          ref={swipeRef}
          containerStyle={styles.cardContainer}
          cards={Dummy_Data}
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
          renderCard={(
            card // this is where you map through the cards array;
          ) => (
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
          )}
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
    // padding: Platform.OS === "ios" ? StatusBar.currentHeight : 0,
  },
  chatBubble: {
    flexDirection: "row",
    justifyContent: "flex-end",
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
