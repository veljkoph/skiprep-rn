import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import { color } from "../../variables/color";
import Ionicons from "react-native-vector-icons/Ionicons";
interface IInputField {
  password?: boolean;
  label: string;
}
const { height } = Dimensions.get("screen");

const InputField = ({ password, label }: IInputField) => {
  const [text, setText] = React.useState("");
  const [hideText, setHideText] = React.useState(password);

  return (
    <View style={styles.container}>
      <TextInput
        label={label}
        value={text}
        mode="outlined"
        secureTextEntry={hideText ? true : false}
        outlineStyle={{
          borderRadius: 5,
          borderColor: color.secondary3,
          borderWidth: 0,
        }}
        style={{
          height: height < 700 ? 50 : 60,
          shadowColor: "#8a8a8a",

          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,

          elevation: 2,
        }}
        activeOutlineColor="#001"
        onChangeText={(text) => setText(text)}
      />
      {password && (
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setHideText(!hideText)}
        >
          <Ionicons
            color={color.secondary3}
            name={hideText ? "eye-outline" : "eye-off-outline"}
            size={25}
            style={{ marginTop: 10 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  btn: {
    position: "absolute",
    height: height < 700 ? 55 : 65,
    right: 15,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});