import React from "react";
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const INTERESTS = [
  "Food",
  "Music",
  "Travel",
  "Sports",
  "Television",
  "Camping",
  "Exercise",
  "Dancing",
  "Art",
  "Cooking",
  "Video Games",
];
const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

export const InterestPicker = (props) => {
  // for interests selector;
  const onPressInterest = (option) => {
    props.changeModalVisibility(false);
    props.setData(option);
  };
  const option = INTERESTS.map((interest, i) => {
    return (
      <TouchableOpacity
        style={{ alignItems: "flex-start" }}
        key={i}
        onPress={() => onPressInterest(interest)}
      >
        <Text style={{ margin: 20, fontSize: 20, fontWeight: "bold" }}>
          {interest}
        </Text>
      </TouchableOpacity>
    );
  });

  return (
    <TouchableOpacity
      onPress={() => props.changeModalVisibility(false)}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View
        style={{
          backgroundColor: "#FFD6A1",
          borderRadius: 10,
          width: WIDTH - 180,
          height: HEIGHT - 300,
        }}
      >
        <ScrollView>{option}</ScrollView>
      </View>
    </TouchableOpacity>
  );
};
