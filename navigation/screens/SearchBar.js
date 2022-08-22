import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather } from "@expo/vector-icons";

const SearchBar = () => {
    const [text, setSearchText] = React.useState('');
    const [clicked, setClicked] = React.useState(false);

    return (
        <View style={styles.container}>
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
            <View>
                <Button
                    title="Cancel"
                    onPress={() => {
                    Keyboard.dismiss();
                    setClicked(false);
                    }}
                ></Button>
            </View>
        )}
        </View>
    );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "95%",

  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
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