import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  View,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { auth, db } from "../../firebase/db";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRoute } from "@react-navigation/native";
import {
  addDoc,
  onSnapshot,
  orderBy,
  collection,
  query,
  doc,
} from "firebase/firestore";
import { Foundation, FontAwesome } from "react-native-vector-icons";
import { GiftedChat, Bubble, Day, Time, Send } from "react-native-gifted-chat";

export default function PublicMessage({ navigation }) {
  const [user] = useAuthState(auth);
  const { params } = useRoute();
  const { displayName, photoURL, id } = params;

  console.log("🧂", displayName);

  const [messages, setMessages] = useState([]);
  const [profile, setProfile] = useState(null);

  const renderDay = (props) => {
    return <Day {...props} textStyle={{ color: "#878787" }} />;
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: "white",
            fontFamily: "Chalkduster",
          },
          left: {
            color: "#24204F",
            fontFamily: "Chalkduster",
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: "#F7DFE1",
          },
          right: {
            backgroundColor: "#A85868",
          },
        }}
        tickStyle={{ color: "#F7DFE1" }}
      />
    );
  };

  const renderTime = (props) => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          right: {
            color: "#F7DFE1",
            fontFamily: "Chalkduster",
          },
          left: {
            color: "#853241",
            fontFamily: "Chalkduster",
          },
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.button}>
          <Ionicons name="send-sharp" size={30} color="red" />
        </View>
      </Send>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.phoneContainer}>
          <Foundation
            style={styles.phone}
            name="telephone"
            size={40}
            color="red"
          />
        </TouchableOpacity>
      ),
      headerTintColor: "#F7DFE1",
      headerStyle: {
        backgroundColor: "#E3AAC1",
      },
    });
  });

  useEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapShot) => {
        if (!snapShot.exists()) {
          console.log("User does not have a profile...");
        }

        setProfile(snapShot.data());
      }),
    []
  );

  console.log(profile?.displayName);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "users", id, "messages"),
          orderBy("createdAt", "desc")
        ),
        (snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              _id: doc.id,
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              user: doc.data().user,
              sent: true,
              received: true,
            }))
          )
      ),
    []
  );

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(db, "users", id, "messages"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  return (
    <ImageBackground
      resizeMode="cover"
      source={{
        uri: "https://mobcup.net/images/wt/631d5d0903dfbe61966a8bb4a646308e.jpg",
      }}
      style={{ flex: 1 }}
    >
      <GiftedChat
        isTyping={true}
        infiniteScroll={true}
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={(messages) => onSend(messages)}
        renderSend={renderSend}
        alwaysShowSend={true}
        renderDay={renderDay}
        renderBubble={renderBubble}
        scrollToBottom={true}
        scrollToBottomComponent={scrollToBottomComponent}
        renderTime={renderTime}
        placeholder="Say Hi!"
        user={{
          _id: profile?.id,
          name: profile?.displayName,
          avatar: profile?.photoURL,
        }}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  phoneContainer: {
    borderRadius: 50,
    backgroundColor: "#FFD9C7",
    width: 50,
    height: 40,
    alignSelf: "flex-end",
  },
  phone: {
    position: "relative",
    left: 10,
  },
  button: {
    position: "relative",
    top: -7,
    left: -12,
  },
});
