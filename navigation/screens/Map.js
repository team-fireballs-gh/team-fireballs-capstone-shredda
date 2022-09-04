import React, { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { getSingleEvent } from "../../redux/reducers/events/singleEventReducer";

export default function App({ route }) {

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.768009,
          longitude: -122.387787,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        }}
      >
        <Marker
          coordinate={{
            latitude: 37.768009,
            longitude: -122.387787,
          }}
          title="title"
          description="title"
        ></Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
