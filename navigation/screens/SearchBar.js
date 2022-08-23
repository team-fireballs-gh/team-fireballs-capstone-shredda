import { StatusBar } from 'expo-status-bar';
import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';



export default function SearchBar() {
    const navigation = useNavigation();
    const [text, setSearchText] = React.useState('');
    const [clicked, setClicked] = React.useState(false);

    return (
        <View style={styles.container} flexDirection="row" >
          <View style={ clicked ? 
              styles.searchBar__clicked 
              : 
              styles.searchBar__unclicked
              }
          >
              <Feather
                  style={{ marginLeft: 1 }}
                  name="search"
                  size={20}
                  color="black"
              />
              <TextInput
                  style={styles.input}
                  placeholder="Search Event"
                  value={text}
                  onChangeText={setSearchText}
                  keyboardType="default"
                  onFocus={() => {
                      setClicked(true);
                  }}
              />
          </View>
          {clicked && (
              <View
                  title="Cancel"
                  onPress={() => {
                  Keyboard.dismiss();
                  setClicked(false);
                  }}
              />
          )}
          <Pressable onPress={() => {
            navigation.navigate("AddEvent")
          }}>            
            <Ionicons name="add-circle-outline" size={40} />
          </Pressable>

        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    width: "95%",
    marginHorizontal: '5%', 
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
});