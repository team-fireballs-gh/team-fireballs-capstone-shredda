import { StyleSheet, Text, View } from 'react-native';
import { CalendarList } from 'react-native-calendars'; 

export default function Calendar({ navigation }) {
  return (
    <View style={styles.container}>
      <CalendarList       
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