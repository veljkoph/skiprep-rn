import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { TextInput } from "react-native-paper";
import { color } from "../../variables/color";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface IInputField {
  password?: boolean;
  label: string;
  onChangeText: (e: string | React.ChangeEvent<any>) => void;
  value: string | undefined;
  error: string | undefined;
  onBlur?: (e: any) => void;
  touched?: boolean | undefined;
  icon?: string;
  multiline?: boolean;
}
const { height } = Dimensions.get("screen");

const LineInput = ({
  password,
  label,
  onChangeText,
  value,
  error,
  onBlur,
  touched,
  icon,
  multiline,
}: IInputField) => {
  const [hideText, setHideText] = React.useState(password);
  const { top } = useSafeAreaInsets();

  useEffect(() => {
    {
      error &&
        touched &&
        Toast.show({
          type: "error",
          text1: error,
          visibilityTime: 10000000,
          // topOffset: top ? top : 40,
          //  text2: "This is some something 👋",
        });
    }
    if (!error) {
      Toast.hide();
    }
  }, [error, touched, value]);

  return (
    <View style={styles.container}>
      <TextInput
        label={label}
        value={value}
        mode="outlined"
        onBlur={onBlur}
        multiline={multiline}
        numberOfLines={5}
        maxLength={250}
        onChangeText={onChangeText}
        secureTextEntry={hideText ? true : false}
        outlineStyle={{
          borderColor: color.primary,
          borderWidth: 0,
          borderBottomWidth: 2,
        }}
        style={{
          minHeight: 50,
          borderRadius: 0,
          backgroundColor: "#f3f3f3",
        }}
        contentStyle={{
          color: "#020020",
          fontSize: 12,
          fontFamily: "Lexend-Regular",
          //  backgroundColor: "white",
          shadowColor: "#8a8a8a",
          borderRadius: 10,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.12,
          shadowRadius: 1.41,
          elevation: 1,
        }}
        activeOutlineColor="#001"
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
      {icon && (
        <TouchableOpacity style={styles.btn} disabled>
          <Ionicons
            color={color.primary}
            name={icon}
            size={25}
            style={{ marginTop: 10 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default LineInput;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "transparent",
    borderRadius: 15,
  },
  btn: {
    position: "absolute",
    height: height < 700 ? 55 : 65,
    right: 15,
    // paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});
