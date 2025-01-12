import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";

const CustomActions = ({ wrapperStyle, iconTextStyle }) => {
  const actionSheet = useActionSheet();

  const onActionPress = () => {
    const options = [
      "Choose photo from Library",
      "Take a picture",
      "Send Location",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;
    actionSheet.showActionSheetWithOptions(
      { options, cancelButtonIndex },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
          default:
        }
      }
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onActionPress}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomActions;

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginRight: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#b2b2b2",
    bordeWidth: 2,
    flex: 1,
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 10,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});
