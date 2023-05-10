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
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTranslation } from "react-i18next";

const { height } = Dimensions.get("screen");

const ForgotPassword = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
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
      //  behavior={Platform?.OS === "ios" ? "padding" : "height"}
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
          <Header
            title={t("forgotPasswordTitle")}
            subtitle={t("forgotPasswordSubtitle")}
          />
          <View style={styles.form}>
            <View style={{ rowGap: 14 }}>
              <InputField label="Email" />
            </View>

            <TouchableOpacity style={styles.mainCta}>
              <Text style={styles.mainCtaText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    //  flex: 1,
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
    fontWeight: "500",
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
    fontWeight: "500",
  },
  secondaryCtaText: {
    color: color.secondary,
    fontSize: 16,
    fontWeight: "700",
  },
});

export default ForgotPassword;
