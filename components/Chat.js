import {
  addDoc,
  onSnapshot,
  orderBy,
  query,
  collection,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  SystemMessage,
} from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from "./CustomActions";
import MapView from "react-native-maps";
import * as Location from "expo-location";

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const [messages, setMessages] = useState([]);
  // extract route parameters for setting title, background color, and userID
  const { name, backgroundColor, userID } = route.params;

  //cache messages locally using AsyncStorage
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem(
        "oldMessages",
        JSON.stringify(messagesToCache)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("oldMessages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  let unsubMessages;

  useEffect(() => {
    //Set the title to the provided "name" parameter
    navigation.setOptions({ title: name });

    //clean up any previous snapshot listener
    if (isConnected === true) {
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      //query firestore messages collection and listen for updates
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages(); //load messages from cache if offline

    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]); //re-run effect when connection state changes

  //function to handle sending new messages
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  //custom bubble styling
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  //custom system message styling
  const renderSystemMessage = (props) => {
    return (
      <SystemMessage
        {...props}
        textStyle={{
          color: "#000",
        }}
      />
    );
  };

  //hide input toolbar when offline
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  //renders custom action component
  const renderCustomActions = (props) => {
    return <CustomActions userID={userID} storage={storage} {...props} />;
  };

  //render custom view for map sharing
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  return (
    //main containser with a changing background color
    <View style={[styles.container, { backgroundColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderSystemMessage={renderSystemMessage}
        onSend={(messages) => onSend(messages)}
        user={{ _id: userID, name: name }}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
      />
      {/* make sure the keyboard doesn't cover up the messages */}
      {/* {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null} */}
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
  },
});

export default Chat;
