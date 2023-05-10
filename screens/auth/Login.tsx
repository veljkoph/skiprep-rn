import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../components/auth/Header";
import InputField from "../../components/inputs/InputField";
import { color } from "../../variables/color";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTranslation } from "react-i18next";
import useLanguageStore from "../../store/useLanguageStore";
import ChangeLanguage from "./ChangeLanguage";
import { AuthStackParamList } from "../../navigation/GuestNavigation/GuestStack";
const { height } = Dimensions.get("screen");

const Login = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [langOpen, setlangOpen] = useState(false);
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { setLanguage, language } = useLanguageStore();

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
      keyboardOpeningTime={10}
      extraScrollHeight={100}
    >
      {langOpen && <ChangeLanguage setlangOpen={setlangOpen} />}
      <StatusBar barStyle={"light-content"} />
      <TouchableWithoutFeedback>
        <View
          style={{
            justifyContent: "space-between",
            flex: 1,
            paddingBottom: insets.top ? insets.top + 10 : 30,
          }}
        >
          <Header title={t("loginTitle")} subtitle={t("loginSubTitle")} />
          <TouchableOpacity
            style={[styles.langBtn, { top: insets.top + 20 }]}
            onPress={() => setlangOpen(!langOpen)}
          >
            <Ionicons color={color.white} name={"globe-outline"} size={32} />
          </TouchableOpacity>

          <View style={styles.form}>
            <View style={{ rowGap: 14 }}>
              <InputField label="Email" />
              <InputField label={t("password")} password />
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={styles.forgotPassword}>{t("forgotPassword")}?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mainCta}>
              <Text style={styles.mainCtaText}>{t("login")}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={styles.classicText}>{t("dontHaveAcc")}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.secondaryCtaText}>
                {t("registerYourself")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default Login;
