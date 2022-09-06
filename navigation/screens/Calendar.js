import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { useSelector, useDispatch } from "react-redux"; 
import { getAllEvents } from "../../redux/reducers/events/eventsReducer";

export default function Calendar({ navigation }) {
  let events = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEvents());
  }, []);
  
  return (
    <View style={styles.container}>
      <CalendarList
      onDayPress={day => {
        console.log('selected day', day);
      }}
          
      markedDates={{
        today : {selected: true, marked: true, selectedColor: 'blue'},
        '2022-09-17': {marked: true},
        '2022-09-18': {marked: true, dotColor: 'red', activeOpacity: 0},
        '2022-09-19': {disabled: true, disableTouchEvent: true}
      }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});