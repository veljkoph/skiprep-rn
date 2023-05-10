import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../components/auth/Header";
import InputField from "../../components/inputs/InputField";
import { color } from "../../variables/color";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTranslation } from "react-i18next";
import { AuthStackParamList } from "../../navigation/GuestNavigation/GuestStack";

const { height } = Dimensions.get("screen");

const Register = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const { t } = useTranslation();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
      bounces={false}
    >
      <StatusBar barStyle={"light-content"} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <View
          style={{
            justifyContent: "space-between",
            flex: 1,

            paddingBottom: insets.top ? insets.top + 10 : 30,
          }}
        >
          <Header title={t("register")} subtitle={t("createAcc")} />
          <View style={styles.form}>
            <View style={{ rowGap: 14 }}>
              <InputField label="Email" />
              <InputField label={t("nickname")} />
              <InputField label={t("password")} password />

              <InputField label={t("passwordConfirmation")} password />
            </View>

            <TouchableOpacity style={styles.mainCta}>
              <Text style={styles.mainCtaText}>{t("register")}</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.classicText}>{t("alreadyHaveAcc")}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.secondaryCtaText}>{t("login")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    //   flex: 1,
  },
  form: {
    padding: 20,
    rowGap: 30,
    backgroundColor: "#f3f3f3",
    flex: 1,
  },
  forgotPassword: {
    fontSize: 15,
    textAlign: "right",
    fontFamily: "Lexend-Medium",
    color: color.primary,
  },
  mainCta: {
    height: height < 700 ? 50 : 60,
    backgroundColor: color.secondary,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  mainCtaText: {
    fontSize: 17,
    color: color.white,
    fontFamily: "Lexend-Bold",
  },
  secondaryCtaText: {
    color: color.secondary,
    fontSize: 16,
    fontFamily: "Lexend-Bold",
  },
  langBtn: {
    position: "absolute",
    right: 20,
  },
  classicText: {
    color: "#000",
    fontSize: 14,
    fontFamily: "Lexend-Light",
  },
});

export default Register;
