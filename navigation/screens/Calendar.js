import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { CalendarList } from 'react-native-calendars';


export default function Calendar({ navigation }) {

  return (
    <View style={styles.container}>
      <CalendarList
        markingType={'period'}
        markedDates={{
          '2022-09-15': {marked: true, dotColor: '#50cebb'},
          '2022-09-16': {marked: true, dotColor: '#50cebb'},
          '2022-09-21': {startingDay: true, color: 'tomato', textColor: 'white'},
          '2022-09-22': {color: 'tomato', textColor: 'white'},
          '2022-09-23': {color: 'tomato', textColor: 'white', marked: true, dotColor: 'white'},
          '2022-09-24': {color: 'tomato', textColor: 'white'},
          '2022-09-25': {endingDay: true, color: 'tomato', textColor: 'white'},
          '2022-09-29': {marked: true, dotColor: '#50cebb'},
          '2022-09-30': {marked: true, dotColor: '#50cebb'},
          '2022-10-07': {startingDay: true, color: 'gold', textColor: 'white'},
          '2022-10-08': {endingDay: true, color: 'gold', textColor: 'white'},
          '2022-10-12': {startingDay: true, color: 'tomato', textColor: 'white', endingDay: true},
          '2022-10-21': {startingDay: true, color: 'tomato', textColor: 'white'},
          '2022-10-22': {endingDay: true, color: 'tomato', textColor: 'white'},
          '2022-10-24': {marked: true, dotColor: '#50cebb'},
          '2022-10-25': {marked: true, dotColor: '#50cebb'},
          '2022-10-26': {marked: true, dotColor: '#50cebb'},
          '2022-10-27': {marked: true, dotColor: '#50cebb'},
          '2022-10-30': {startingDay: true, color: 'tomato', textColor: 'white', endingDay: true},


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