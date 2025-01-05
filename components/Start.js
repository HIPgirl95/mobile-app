import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

const Start = ({ navigation }) => {
  const [name, setName] = useState();
  const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];
  const [backgroundColor, setBackgroundColor] = useState("");

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/BackgroundImage.png")}
        style={styles.background}
      >
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
          <TouchableOpacity
            style={styles.button}
            title="Go to Chat"
            onPress={() =>
              navigation.navigate("Chat", {
                name: name,
                backgroundColor: backgroundColor,
              })
            }
          >
            <Text style={styles.buttonText}>Go to chat!</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
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
