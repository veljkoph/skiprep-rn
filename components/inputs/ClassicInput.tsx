import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React, { useEffect } from "react";

import { color } from "../../variables/color";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FormikErrors, FormikTouched } from "formik";

interface IInputField {
  password?: boolean;
  label: string;
  onChangeText: (e: string | React.ChangeEvent<any>) => void;
  value: string | undefined;
  error?:
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | undefined;
  onBlur?: (e: any) => void;
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[] | undefined;
  disabled?: boolean | undefined;
}
const { height } = Dimensions.get("screen");

const ClassicInput = ({
  password,
  label,
  onChangeText,
  value,
  error,
  onBlur,
  touched,
  disabled,
}: IInputField) => {
  const [hideText, setHideText] = React.useState(password);
  const { top } = useSafeAreaInsets();

  useEffect(() => {
    {
      error &&
        touched &&
        Toast.show({
          type: "error",
          text1: error as string,
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
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Lexend-Regular",
            color: color.black,
          }}
        >
          {label}
        </Text>
        {disabled && (
          <TouchableOpacity
            style={styles.btn}
            disabled
            onPress={() => setHideText(!hideText)}
          >
            <Ionicons
              color={color.secondary1}
              name="checkmark-circle-outline"
              size={20}
            />
          </TouchableOpacity>
        )}
      </View>

      <TextInput
        value={value}
        onBlur={onBlur}
        editable={disabled}
        onChangeText={onChangeText}
        secureTextEntry={hideText ? true : false}
        style={{
          height: height < 700 ? 50 : 60,
          backgroundColor: "#fff",
          color: disabled ? color.secondary3 : "#020020",
          fontSize: height < 700 ? 14 : 15,
          fontFamily: "Lexend-Regular",
          shadowColor: "#8a8a8a",
          borderRadius: error && touched ? 1 : 5,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.12,
          shadowRadius: 1.41,
          elevation: 1,
          paddingLeft: 10,
        }}
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

export default ClassicInput;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "transparent",
    borderRadius: 15,
    rowGap: 10,
  },
  btn: {
    //    / position: "absolute",
  },
});
