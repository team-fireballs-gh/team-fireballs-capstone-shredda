import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Platform,
  Alert,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import CheckBox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "../../firebase/db";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useNavigation } from "@react-navigation/native";
import {
  serverTimestamp,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

const WIDTH = Dimensions.get("screen").width;

export default function Chats() {
  const [user] = useAuthState(auth);
  const navigation = useNavigation();

  const [userData, setUserData] = useState(null);

  // for profile picture
  const [image, setImage] = useState(null);
  const [background, setBackground] = useState(null);
  const [uploading, setUploading] = useState(false);

  // for interests checkboxes
  const [food, setFood] = useState(false);
  const [music, setMusic] = useState(false);
  const [trav, setTrav] = useState(false);
  const [sport, setSport] = useState(false);
  const [tele, setTele] = useState(false);
  const [camp, setCamp] = useState(false);
  const [exer, setExer] = useState(false);
  const [dance, setDance] = useState(false);
  const [art, setArt] = useState(false);
  const [cook, setCook] = useState(false);
  const [vGame, setVGame] = useState(false);

  // userType checkboxes
  const [isSolo, setSolo] = useState(false);
  const [isRomance, setRomance] = useState(false);
  const [isFriendship, setFriendship] = useState(false);

  /* get user data */
  const getUser = () => {
    let unsub;

    unsub = onSnapshot(doc(db, "users", user.uid), (snapShot) => {
      if (!snapShot.exists()) {
        console.log("User does not have a profile...");
      }
      setUserData(snapShot.data());
    });

    return unsub;
  };

  useEffect(async () => {
    getUser();

    if (Platform !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync(); // to interact with the permissions;
      if (status !== "granted") {
        Alert.alert("Status", "Permission denied!", [
          {
            text: "Understood",
            onPress: () => console.log("I guess you understood."),
          },
        ]);
      }
    }
  }, []);

  /* pick image from phone library */
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const url = await uploadImage(result.uri);
      console.log("😄", url);
      setUploading(false);
      setImage(url);
    }
  };

  /* uploading image to firebase storage */
  const uploadImage = async (image) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    const storageRef = ref(storage, new Date().toISOString());

    await uploadBytes(storageRef, blob).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      setUploading(true);
    });

    blob.close();
    return await getDownloadURL(storageRef);
  };

  const pickBg = async () => {
    // for background image
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log("yurr", result.uri);
      const url = await uploadBg(result.uri);
      console.log("😄", url);
      setUploading(false);
      setBackground(url);
    }
  };

  const uploadBg = async (bg) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", bg, true);
      xhr.send(null);
    });

    const storageRef = ref(storage, new Date().toISOString());

    await uploadBytes(storageRef, blob).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      setUploading(true);
    });

    blob.close();
    return await getDownloadURL(storageRef);
  };

  const updateUser = async () => {
    try {
      await updateDoc(doc(db, "users", user.uid), {
        id: user.uid,
        displayName: userData.displayName,
        photoURL: image || userData?.photoURL,
        bgImg: background || userData?.bgImg,
        age: userData.age,
        birthday: userData.birthday,
        userType: {
          solo: isSolo,
          romance: isRomance,
          friendship: isFriendship,
        },
        politicalViews: userData.politicalViews,
        job: userData.job,
        sexuality: userData.sexuality,
        pronouns: userData.pronouns,
        genderIdentity: userData.genderIdentity,
        education: userData.education,
        smoker: userData.smoker,
        drinker: userData.drinker,
        aboutMe: userData.aboutMe,
        interests: {
          food: food,
          music: music,
          travel: trav,
          sports: sport,
          television: tele,
          camping: camp,
          exercise: exer,
          dancing: dance,
          art: art,
          cooking: cook,
          videogames: vGame,
        },
        timestamp: serverTimestamp(),
      });
      navigation.goBack();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ margin: 5 }}>
        <Image
          style={{ height: 100, width: "100%" }}
          resizeMode="contain"
          source={require("../../assets/fireball.png")}
        />

        <Text style={styles.name}>
          Welcome {userData ? userData.displayName : ""}!
        </Text>
        <TouchableOpacity style={styles.active} onPress={updateUser}>
          <Text style={{ textAlign: "center", color: "white", fontSize: 15 }}>
            Update
          </Text>
        </TouchableOpacity>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="position"
          enabled={true}
        >
          <ScrollView>
            <Text>Full Name</Text>
            <TextInput
              style={{ backgroundColor: "beige" }}
              value={userData ? userData.displayName : ""}
              onChangeText={(txt) =>
                setUserData({ ...userData, displayName: txt })
              }
              placeholder="Enter your display name..."
              returnKeyType="done"
              blurOnSubmit={true}
            />

            <Text>Profile Picture</Text>
            {!uploading ? (
              <Button title="Upload Image" onPress={pickImage} />
            ) : (
              <ActivityIndicator size="large" color="#000" />
            )}
            {userData && !image ? (
              <Image
                source={{ uri: userData.photoURL }}
                style={{ width: 200, height: 200, alignSelf: "center" }}
              />
            ) : (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200, alignSelf: "center" }}
              />
            )}

            <Text>Background Photo</Text>
            {!uploading ? (
              <Button title="Upload Image" onPress={pickBg} />
            ) : (
              <ActivityIndicator size="large" color="#000" />
            )}
            {userData && !background ? (
              <Image
                source={{
                  uri: "https://media.istockphoto.com/photos/forest-wooden-table-background-summer-sunny-meadow-with-green-grass-picture-id1353553203?b=1&k=20&m=1353553203&s=170667a&w=0&h=QTyTGI9tWQluIlkmwW0s7Q4z7R_IT8egpzzHjW3cSas=",
                }}
                style={{ width: 200, height: 200, alignSelf: "center" }}
              />
            ) : (
              <Image
                source={{ uri: background }}
                style={{ width: 200, height: 200, alignSelf: "center" }}
              />
            )}

            <Text>Age</Text>
            <TextInput
              style={{ backgroundColor: "beige" }}
              value={userData ? userData.age : ""}
              onChangeText={(txt) => setUserData({ ...userData, age: txt })}
              keyboardType="numeric"
              maxLength={2}
              placeholder="Enter your age..."
              returnKeyType="done"
            />

            <Text>Interests</Text>
            <View style={styles.interest}>
              <CheckBox
                disabled={false}
                // value={userData ? userData.interests["food"] : food }
                value={food}
                onValueChange={setFood}
              />
              <Text style={styles.intText}>Food</Text>

              <CheckBox
                disabled={false}
                value={music}
                onValueChange={setMusic}
              />
              <Text style={styles.intText}>Music</Text>

              <CheckBox disabled={false} value={trav} onValueChange={setTrav} />
              <Text style={styles.intText}>Travel</Text>

              <CheckBox
                disabled={false}
                value={sport}
                onValueChange={setSport}
              />
              <Text style={styles.intText}>Sports</Text>

              <CheckBox disabled={false} value={tele} onValueChange={setTele} />
              <Text style={styles.intText}>Television</Text>

              <CheckBox disabled={false} value={camp} onValueChange={setCamp} />
              <Text style={styles.intText}>Camping</Text>

              <CheckBox disabled={false} value={exer} onValueChange={setExer} />
              <Text style={styles.intText}>Exercise</Text>

              <CheckBox
                disabled={false}
                value={dance}
                onValueChange={setDance}
              />
              <Text style={styles.intText}>Dancing</Text>

              <CheckBox disabled={false} value={art} onValueChange={setArt} />
              <Text style={styles.intText}>Art</Text>

              <CheckBox disabled={false} value={cook} onValueChange={setCook} />
              <Text style={styles.intText}>Cooking</Text>

              <CheckBox
                disabled={false}
                value={vGame}
                onValueChange={setVGame}
              />
              <Text style={styles.intText}>Video Games</Text>
            </View>

            <Text>About Me</Text>
            <ScrollView>
              <TextInput
                style={styles.text}
                value={userData ? userData.aboutMe : ""}
                onChangeText={(txt) =>
                  setUserData({ ...userData, aboutMe: txt })
                }
                multiline={true}
                numberOfLines={15}
                blurOnSubmit={true}
                placeholder="Let us get to know you!"
                returnKeyType="done"
              />
            </ScrollView>

            <Text style={{ paddingTop: 10 }}>Birthday</Text>
            <TextInput
              style={{ backgroundColor: "beige" }}
              value={userData ? userData.birthday : ""}
              onChangeText={(txt) =>
                setUserData({ ...userData, birthday: txt })
              }
              placeholder="Enter your response..."
              returnKeyType="done"
              blurOnSubmit={true}
            />

            <Text>Drinker</Text>
            <TextInput
              style={{ backgroundColor: "beige" }}
              value={userData ? userData.drinker : ""}
              onChangeText={(txt) => setUserData({ ...userData, drinker: txt })}
              placeholder="Enter your response..."
              returnKeyType="done"
              blurOnSubmit={true}
            />

            <Text>Smoker</Text>
            <TextInput
              style={{ backgroundColor: "beige" }}
              value={userData ? userData.smoker : ""}
              onChangeText={(txt) => setUserData({ ...userData, smoker: txt })}
              placeholder="Enter your response..."
              returnKeyType="done"
              blurOnSubmit={true}
            />

            <Text>Education</Text>
            <TextInput
              style={{ backgroundColor: "beige" }}
              value={userData ? userData.education : ""}
              onChangeText={(txt) =>
                setUserData({ ...userData, education: txt })
              }
              placeholder="Enter your education..."
              returnKeyType="done"
              blurOnSubmit={true}
            />

            <Text>Email</Text>
            <Text style={{ backgroundColor: "beige" }}>{user.email}</Text>

            <Text>Gender Identity</Text>
            <TextInput
              style={{ backgroundColor: "beige" }}
              value={userData ? userData.genderIdentity : ""}
              onChangeText={(txt) =>
                setUserData({ ...userData, genderIdentity: txt })
              }
              placeholder="Enter your gender identity..."
              returnKeyType="done"
              blurOnSubmit={true}
            />

            <Text>Pronouns</Text>
            <TextInput
              style={{ backgroundColor: "beige" }}
              value={userData ? userData.pronouns : ""}
              onChangeText={(txt) =>
                setUserData({ ...userData, pronouns: txt })
              }
              placeholder="Enter your pronouns..."
              returnKeyType="done"
              blurOnSubmit={true}
            />

            <Text>Sexuality</Text>
            <TextInput
              style={{ backgroundColor: "beige" }}
              value={userData ? userData.sexuality : ""}
              onChangeText={(txt) =>
                setUserData({ ...userData, sexuality: txt })
              }
              placeholder="Enter your sexuality..."
              returnKeyType="done"
              blurOnSubmit={true}
            />

            <Text>User Type</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <CheckBox
                disabled={false}
                value={isSolo}
                onValueChange={setSolo}
              />
              <Text>solo</Text>

              <CheckBox
                disabled={false}
                value={isRomance}
                onValueChange={setRomance}
              />
              <Text>romance</Text>

              <CheckBox
                disabled={false}
                value={isFriendship}
                onValueChange={setFriendship}
              />
              <Text>friendship</Text>
            </View>

            <Text>Occupation</Text>
            <TextInput
              style={{ backgroundColor: "beige" }}
              value={userData ? userData.job : ""}
              onChangeText={(txt) => setUserData({ ...userData, job: txt })}
              placeholder="Enter your job..."
              returnKeyType="done"
              blurOnSubmit={true}
            />

            <Text>Political views</Text>
            <TextInput
              value={userData ? userData.politicalViews : ""}
              onChangeText={(txt) =>
                setUserData({ ...userData, politicalViews: txt })
              }
              placeholder="Enter your views..."
              style={{ backgroundColor: "beige" }}
              returnKeyType="done"
              blurOnSubmit={true}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  text: {
    flexWrap: "wrap",
    fontSize: 14,
    width: WIDTH,
    backgroundColor: "beige",
    alignItems: "flex-start",
  },
  calendar: {
    backgroundColor: "pink",
    width: 50,
    height: 50,
    borderRadius: 16,
    padding: 10,
    justifyContent: "center",
    shadowColor: "gray",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    position: "relative",
    left: "68%",
    top: "-5%",
  },
  name: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#FF690A",
    paddingBottom: 20,
    position: "relative",
    left: "-15%",
  },
  active: {
    width: 90,
    backgroundColor: "#E66000",
    padding: 10,
    borderRadius: 18,
    position: "absolute",
    top: "12%",
    left: "75%",
  },
  inActive: {
    width: 90,
    backgroundColor: "#D6D0C9",
    padding: 10,
    borderRadius: 18,
    position: "absolute",
    top: "12%",
    left: "70%",
  },
  interest: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  intText: {
    fontSize: 15,
    paddingLeft: 10,
    flexBasis: "27%",
  },
});
