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
          '2022-09-23': {startingDay: true, color: '#50cebb', textColor: 'white', marked: true, dotColor: 'white'},
          '2022-09-24': {color: '#70d7c7', textColor: 'white'},
          '2022-09-25': {endingDay: true, color: '#50cebb', textColor: 'white'}
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