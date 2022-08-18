import { StatusBar } from 'expo-status-bar';
import react from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';

import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  Image
} from 'react-native';
import { 
  useDimensions 
} from '@react-native-community/hooks';

export default function AddUsers({ navigation }) {
  // console.log(Dimensions.get("screen"));
  console.log(useDimensions());

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.imageContainer}>
        <View>
          <Image style={{height: 130, width: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20}} source={{uri: 'https://media.istockphoto.com/photos/forest-wooden-table-background-summer-sunny-meadow-with-green-grass-picture-id1353553203?b=1&k=20&m=1353553203&s=170667a&w=0&h=QTyTGI9tWQluIlkmwW0s7Q4z7R_IT8egpzzHjW3cSas='}}  />
        </View>
      </View>
      <View style={{flexDirection: 'row', }}>
        <View style={styles.circle}>
          <AntIcon name='close' size={35} color="#FFC1CB" />
        </View>
        <View style={styles.circle}>
          <AntIcon name='hearto' size={35} color="#EB5559" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'beige',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // padding: Platform.OS === "ios" ? StatusBar.currentHeight : 0,
  },
  imageContainer: {
    height: 430,
    width: 345,
    backgroundColor: 'white',
    borderRadius: 21,
    elevation: 4
  },
  // footer: {
  //   flex: 1,
  //   flexDirection: "row",
  //   alignItems: 'center',
  //   padding: 16,
  // },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 2,
  },
});
