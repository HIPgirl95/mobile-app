import { StatusBar } from "expo-status-bar";
import { Alert, ImageBackground, StyleSheet, Text, View } from "react-native";
import Start from "./components/Start";
import Chat from "./components/Chat";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import {
  disableNetwork,
  enableNetwork,
  getFirestore,
} from "firebase/firestore";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";

const Stack = createNativeStackNavigator();

const App = () => {
  const connectionStatus = useNetInfo();
  const firebaseConfig = {
    apiKey: "AIzaSyCgXr0moXGJ25N4elQNZ9U0rgN098fWNyk",
    authDomain: "chat-app-6d139.firebaseapp.com",
    projectId: "chat-app-6d139",
    storageBucket: "chat-app-6d139.firebasestorage.app",
    messagingSenderId: "40593220063",
    appId: "1:40593220063:web:d40bfa8b4f8c5cccd3246a",
  };

  //initialize Firebase
  const app = initializeApp(firebaseConfig);

  //initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;

//testing in VSCode source control
