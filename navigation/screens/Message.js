import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { auth, db } from "../../firebase/db";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRoute } from "@react-navigation/native";
import {
  addDoc,
  onSnapshot,
  orderBy,
  collection,
  query,
} from "firebase/firestore";
import { Foundation } from "react-native-vector-icons";
import { GiftedChat } from "react-native-gifted-chat";

export default function Message({ navigation }) {
  const [user] = useAuthState(auth);
  const { params } = useRoute();
  const { matchInfo } = params;

  const [messages, setMessages] = useState([]);

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
    });
  });

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matchedUsers", matchInfo.id, "messages"),
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
    addDoc(collection(db, "matchedUsers", matchInfo.id, "messages"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <GiftedChat
      isTyping={true}
      infiniteScroll={true}
      loadEarlier={true}
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user.email,
        name: matchInfo.users[user.uid].displayName,
        avatar: matchInfo.users[user.uid].photoURL,
      }}
    />
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
});
