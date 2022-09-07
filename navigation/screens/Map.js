import React, { useEffect } from "react";
import MapView, { Marker, AnimatedRegion, Animated} from "react-native-maps";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { getAllEvents } from "../../redux/reducers/events/eventsReducer";

export default function App({ route }) {
    let events = useSelector((state) => state.events);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllEvents());
        console.log("EVENTS", events);
    }, []);


    return (
        <View>
            <MapView
                initialRegion={{
                    latitude: 40.7128,
                    longitude: -73.935242,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5,
                }}
                style={styles.map}
                zoomEnabled={true}
            >
                {events.map((event) => {
                    return (
                        <Marker
                        key={event.id}
                        coordinate={{
                            latitude: Number(event.data.latitude),
                            longitude: Number(event.data.longitude),
                        }}
                        title={event.data.title}
                        description={event.data.address}
                        ></Marker>

                    )
                })}
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
