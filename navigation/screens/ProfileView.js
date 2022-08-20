import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const ProfileView = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View>
          <Image
            style={{
              height: 130,
              width: "100%",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
            source={{
              uri: "https://media.istockphoto.com/photos/forest-wooden-table-background-summer-sunny-meadow-with-green-grass-picture-id1353553203?b=1&k=20&m=1353553203&s=170667a&w=0&h=QTyTGI9tWQluIlkmwW0s7Q4z7R_IT8egpzzHjW3cSas=",
            }}
          />
        </View>

        <View style={styles.profilePic}>
          <Image
            style={{ height: "100%", width: "100%", borderRadius: "50%" }}
            source={{
              uri: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/41822045014839.5824bf369f54b.jpg",
            }}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Shauna, The Queen{" "}
            <Ionicons name="create-outline" size={20} color={"tomato"} />
          </Text>

          <Text style={{ color: "#9597A1" }}>
            Pronouns, Interests, Tag line/ first impression
          </Text>

          <View style={styles.profileInfo}>
            <Text style={styles.header}>About Me</Text>

            <View style={styles.profileSection}>
              <ScrollView>
                <Text style={styles.profileText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Pulvinar mattis nunc sed blandit libero volutpat. Pellentesque
                  habitant morbi tristique senectus et netus et malesuada fames.
                  In fermentum posuere urna nec tincidunt praesent semper.
                  Rhoncus mattis rhoncus urna neque viverra justo nec ultrices.
                  Et magnis dis parturient montes. Pellentesque id nibh tortor
                  id aliquet lectus. Tempor orci dapibus ultrices in iaculis
                  nunc sed augue. Purus viverra accumsan in nisl nisi
                  scelerisque.
                </Text>
              </ScrollView>
            </View>

            <Text style={styles.header}>My Interests</Text>
            <View style={styles.profileSection}>
              <Text style={styles.profileText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Pulvinar mattis nunc sed blandit libero volutpat. Pellentesque
                habitant morbi tristique senectus et netus et malesuada fames.
                In fermentum posuere urna nec tincidunt praesent semper. Rhoncus
                mattis rhoncus urna neque viverra justo nec ultrices. Et magnis
                dis parturient montes. Pellentesque id nibh tortor id aliquet
                lectus. Tempor orci dapibus ultrices in iaculis nunc sed augue.
                Purus viverra accumsan in nisl nisi scelerisque. Egestas tellus
                rutrum tellus pellentesque. Sapien nec sagittis aliquam
                malesuada.
              </Text>
            </View>

            <Text style={styles.header}>My Interests</Text>
            <View style={styles.profileSection}>
              <ScrollView>
                <Text style={styles.profileText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Pulvinar mattis nunc sed blandit libero volutpat. Pellentesque
                  habitant morbi tristique senectus et netus et malesuada fames.
                  In fermentum posuere urna nec tincidunt praesent semper.
                  Rhoncus mattis rhoncus urna neque viverra justo nec ultrices.
                  Et magnis dis parturient montes. Pellentesque id nibh tortor
                  id aliquet lectus. Tempor orci dapibus ultrices in iaculis
                  nunc sed augue. Purus viverra accumsan in nisl nisi
                  scelerisque. Egestas tellus rutrum tellus pellentesque. Sapien
                  nec sagittis aliquam malesuada.
                </Text>
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "beige",
    justifyContent: "space-evenly",
  },
  imageContainer: {
    backgroundColor: "white",
    borderRadius: 21,
    elevation: 4,
  },
  textContainer: {
    height: 45,
    width: "100%",
    position: "absolute",
    top: 200,
    alignItems: "center",
  },
  profilePic: {
    height: 135,
    width: 140,
    alignSelf: "center",
    position: "absolute",
    top: 75,
  },
  text: {
    alignSelf: "center",
    fontSize: 15,
    lineHeight: 48,
    fontWeight: "bold",
  },
  profileInfo: {
    alignItems: "left",
    padding: 20,
  },
  header: {
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10,
  },
  profileText: {
    flexWrap: "wrap",
    height: "100%",
  },
  profileSection: {
    flexGrow: 1,
    flexDirection: "row",
    width: "100%",
  },
});

export default ProfileView;
