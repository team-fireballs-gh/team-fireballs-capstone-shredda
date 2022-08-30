import React from "react";
import { Text, View, SafeAreaView } from "react-native";
import ChatList from "../components/ChatList";
import Header from "../components/Header";

export default function Chats({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }} >
      <Header title="Chat" callOn />
      <ChatList />
    </SafeAreaView>
  );
};