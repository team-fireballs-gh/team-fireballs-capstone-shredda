import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, TextInput, StyleSheet, Text, Button
} from 'react-native'

export default function AddEvent() {
    const [eventName, onChangeEventName, eventDate, onChangeEventDate, eventLink, onChangeEventLink, eventLocation, onChangeEventLocation] = React.useState(null);
    return (
        <View style={styles.wholeContainer}>
            <View style={styles.individualContainer}>
                <Text style={styles.header}>
                    Pick a Name!
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeEventName}
                    value={eventName}
                    placeholder="Event Name"
                />
            </View>
            <View style={styles.individualContainer}>
                <Text style={styles.header}>
                    When is it?
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeEventDate}
                    value={eventDate}
                    placeholder="Date"
                />
            </View>
            <View style={styles.individualContainer}>
                <Text style={styles.header}>
                    Where is it?
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeEventLocation}
                    value={eventLocation}
                    placeholder="Address"
                />
            </View>
            <View style={styles.individualContainer}>
                <Text style={styles.header}>
                    External Link
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeEventLink}
                    value={eventLink}
                    placeholder="Website Link"
                />
            </View>
            <Button
                color="tomato"
                title="Add Event"
            />
        </View>
    )
}
//make add event and single event as children of events component in app.js 

const styles = StyleSheet.create({
    wholeContainer: {
        backgroundColor: "white",
        height: "100%",
        width: "100%",
    },
    individualContainer: {
        marginVertical: '5%'
    },
    header: {
        margin: 12,
        fontSize: 20,
        marginHorizontal: '5%',
    },
    input: {
        height: 40,
        marginHorizontal: '5%',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
});