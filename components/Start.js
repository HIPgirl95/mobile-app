import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

//Start screen component, where users can input their name and choose a background color
const Start = ({ navigation }) => {
  const [name, setName] = useState();
  const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];
  const [backgroundColor, setBackgroundColor] = useState("");

  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          userID: result.user.uid,
          backgroundColor: backgroundColor,
          name: name,
        });
        Alert.alert(`Now chatting as ${name}`);
      })
      .catch((error) => {
        Alert.alert("Unable to sign in. Try again later.");
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/BackgroundImage.png")}
        style={styles.background}
      >
        {/* Allows users to input their name and select a backgroundColor */}
        <View style={styles.interactBox}>
          <View style={styles.textbox}>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="Type your username here"
            />
          </View>
          <View>
            {/* maps all the colors to get individual buttons for each one */}
            <Text style={styles.colorText}>Choose background color</Text>
            <View style={styles.colorSelect}>
              {colors.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.color, { backgroundColor: color }]}
                  onPress={() => setBackgroundColor(color)}
                />
              ))}
            </View>
          </View>
          {/* button to navigate to the chat screen */}
          <TouchableOpacity
            style={styles.button}
            title="Go to Chat"
            onPress={() => {
              signInUser();
            }}
          >
            <Text style={styles.buttonText}>Go to chat!</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      {/* keyboard avoiding behavior */}
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  interactBox: {
    backgroundColor: "#FFFFFF",
    padding: 15,
  },
  colorText: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: 300,
    color: "#757083",
  },
  colorSelect: {
    flexDirection: "row",
    alignItems: "center",
  },
  color: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 3,
  },
  textInput: {
    width: "88%",
    alignSelf: "center",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    alignItems: "center",
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#757083",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 600,
    color: "#FFFFFF",
    alignSelf: "center",
    padding: 6,
  },
});

export default Start;
