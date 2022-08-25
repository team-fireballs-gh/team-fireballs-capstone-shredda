import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { Image, Text, View, StyleSheet, ScrollView, SafeAreaView, Pressable, TextInput 
} from 'react-native';
import Entypo from "react-native-vector-icons/Entypo";
import AntIcon from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import { getSingleEvent } from "../../redux/reducers/events/singleEventReducer";
import { updateEvent } from "../../redux/reducers/events/eventsReducer";
import { useSelector, useDispatch } from "react-redux";

export default function EditEvent({ route, navigation }) {
    const { id } = route.params;
    let singleEvent = useSelector((state) => state.singleEvent);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getSingleEvent(id)); 
    }, [dispatch]);
    console.log("ID!!!!!!:", id)
    console.log("SingleEvent!!!!:", singleEvent)

    const [eventInfo, updateEventInfo] = useState({
        title: singleEvent.title,
        address: singleEvent.address,
        websiteLink: singleEvent.websiteLink,
    })
    console.log("EventINFO!!!!!!:",eventInfo)

    const handleChange = (event) => {
        updateEventInfo({...eventInfo, [event.target.name]: event.target.value}) 
    };
   

    const handleSubmit = (event) => {
        event.preventDefault();
        updateEventInfo({title:"", address:"", websiteLink:""});
        dispatch(updateEvent({id}, eventInfo)); 
    }

    return (
        <SafeAreaView style={[{ flex: 1 }]}>
            <StatusBar style="auto" />
            <View style={styles.profileContainer}>
                <Image
                style={styles.backgroundImage}
                source={{
                    uri: 'https://experiencity.ca/blog/articlesimages/display/e10/704/6551358d843fb25a3434a93321/latern-eventhub-RhinoCanada-ca.jpg',
                }}/>
            </View>
            <TextInput 
                style={styles.eventNameInput}
                onChangeText={handleChange}
                value={eventInfo.title}>
            </TextInput>
            <View style={styles.location} flexDirection="row" justifyContent="space-evenly"> 
                <Text style={styles.locationText}>
                    <Entypo name="location-pin" size={20} color="gray"/>
                    {singleEvent.address}
                </Text>
                <Text style={styles.dateText}>
                    <AntIcon name="calendar" size={20} color="gray"/>
                    dates
                </Text>
                <Pressable 
                    onPress={handleSubmit}
                >
                    <Feather name="check-square" size={20} color="green"/>
                </Pressable>
            </View>
            <ScrollView>
                <Text style={styles.header}>Description</Text>
                <TextInput                 
                    style={styles.content}
                    onChangeText={handleChange}
                    value={eventInfo.websiteLink}
                    multiline>
                </TextInput>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    profileContainer: {
        height: "25%",
        width: "100%",
        backgroundColor: "white",
        elevation: 4,
    },
    backgroundImage: {
        height: "100%",
        width: "100%",
    },  
    textContainer: {
        backgroundColor: "gray",
        opacity: 0.8,
        position: 'absolute',
        bottom:0,
        width: '100%',
        height:  120,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    eventNameInput: {
        fontSize: 30,
        color: 'black',
        marginHorizontal: 10,
        marginTop: 5,
        alignSelf: "center",
        borderWidth: 2,
        padding: 5,
        borderRadius: 10,
        borderStyle: 'dashed',
        borderColor: 'tomato'
    },
    locationText: {
        fontSize: 16,
        color: 'grey',
    },
    dateText: {
        fontSize: 16,
        color: 'grey',
    },
    location: { 
        margin: 5,
    },
    header: {
        fontSize: 18,
        fontWeight: "bold",
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: "5%",
    },
    content: {
        fontSize: 16,
        marginLeft: "5%",
        marginRight: "10%",
        borderWidth: 2,
        padding: 5,
        borderRadius: 10,
        borderStyle: 'dashed',
        borderColor: 'tomato',
        height: 150,
    },
})