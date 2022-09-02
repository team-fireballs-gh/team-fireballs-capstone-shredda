import React, { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { getSingleEvent } from "../../redux/reducers/events/singleEventReducer";

export default function App({ route }) {
  const { id } = route.params;
  let singleEvent = useSelector((state) => state.singleEvent);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleEvent(id));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {
          // https://www.npmjs.com/package/react-native-geocoding - address to coordinates?
        }
        <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          title={singleEvent.title}
          description={singleEvent.address}
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
