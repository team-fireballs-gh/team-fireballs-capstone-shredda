import React from "react";
import { SafeAreaView } from "react-native";
import ChatList from "../components/ChatList";
import Header from "../components/Header";

export default function Chats({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }} >
      <Header title="Chat" />
      <ChatList />
    </SafeAreaView>
  );
};