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
}
const { height } = Dimensions.get("screen");

const InputField = ({
  password,
  label,
  onChangeText,
  value,
  error,
  onBlur,
  touched,
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
        onChangeText={onChangeText}
        secureTextEntry={hideText ? true : false}
        outlineStyle={{
          borderRadius: 5,
          borderColor: color.secondary,
          borderWidth: error && touched ? 1 : 0,
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
        contentStyle={{
          color: "#020020",
          fontSize: height < 700 ? 14 : 15,
          fontFamily: "Lexend-Regular",
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
