import React from "react";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  StatusBar,
  ImageBackground,
  Button,
  SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import useAuth from "../../auth";

const ProfileView = ({navigation}) => {
  const { logout, user } = useAuth();
  console.log(user)
  const logOutButton = () => {
    navigation.navigate('Login')
    logout()
  }

  return (
    <SafeAreaView style={[{ flex: 1 }]}>
      <Button
        style={{ position: "absolute", top: 10, color: "blue" }}
        title="logout"
        onPress={logOutButton}
      />
      <View style={styles.profileContainer}>
        <ImageBackground
          style={styles.backgroundImage}
          source={{
            uri: "https://media.istockphoto.com/photos/forest-wooden-table-background-summer-sunny-meadow-with-green-grass-picture-id1353553203?b=1&k=20&m=1353553203&s=170667a&w=0&h=QTyTGI9tWQluIlkmwW0s7Q4z7R_IT8egpzzHjW3cSas=",
          }}
        ></ImageBackground>
        <Image
          style={styles.profilePic}
          source={{
            uri: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/41822045014839.5824bf369f54b.jpg",
          }}
        ></Image>
        <Text style={styles.name}>Shauna, age, (pronouns)</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.textContainer}>
          <Text style={styles.header}>About Me</Text>
          <Text style={styles.content}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar
            mattis nunc sed blandit libero volutpat. Pellentesque habitant morbi
            tristique senectus et netus et malesuada fames. In fermentum posuere
            urna nec tincidunt praesent semper.
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.header}>About Me</Text>
          <Text style={styles.content}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar
            mattis nunc sed blandit libero volutpat. Pellentesque habitant morbi
            tristique senectus et netus et malesuada fames. In fermentum posuere
            urna nec tincidunt praesent semper.
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.header}>About Me</Text>
          <Text style={styles.content}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar
            mattis nunc sed blandit libero volutpat. Pellentesque habitant morbi
            tristique senectus et netus et malesuada fames. In fermentum posuere
            urna nec tincidunt praesent semper.
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.header}>About Me</Text>
          <Text style={styles.content}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar
            mattis nunc sed blandit libero volutpat. Pellentesque habitant morbi
            tristique senectus et netus et malesuada fames. In fermentum posuere
            urna nec tincidunt praesent semper.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    height: "25%",
    width: "100%",
    backgroundColor: "white",
    elevation: 4,
  },
  backgroundImage: {
    height: "70%",
    width: "100%",
  },
  profilePic: {
    height: "65%",
    width: "30%",
    alignSelf: "center",
    position: "absolute",
    top: "15%",
    borderRadius: 50,
  },
  name: {
    fontSize: 18,
    lineHeight: 48,
    fontWeight: "bold",
    alignSelf: "center",
    top: "5%",
  },

  scrollView: {
    backgroundColor: "white",
    // showVerticalScrollBar: false,
  },
  textContainer: {
    paddingBottom: 20,
  },
});

export default ProfileView;

