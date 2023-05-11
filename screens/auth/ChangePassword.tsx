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
import { Formik } from "formik";
import * as yup from "yup";
import useLoginValidation from "../../hooks/validations/useLoginValidation";
import usePasswordChangeValidation from "../../hooks/validations/usePasswordChangeValidation";
const { height } = Dimensions.get("screen");

const ChangePassword = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [langOpen, setlangOpen] = useState(false);
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const PasswordShema = usePasswordChangeValidation();

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
          <Header
            title={t("changePasswordTitle")}
            subtitle={t("changePasswordSubtitle")}
          />
          <TouchableOpacity
            style={[styles.langBtn, { top: insets.top + 20 }]}
            onPress={() => setlangOpen(!langOpen)}
          >
            <Ionicons color={color.white} name={"globe-outline"} size={32} />
          </TouchableOpacity>
          <View style={styles.form}>
            <Formik
              validationSchema={PasswordShema}
              initialValues={{ confirmPassword: "", password: "" }}
              onSubmit={(values) => console.log(values)}
            >
              {(props) => (
                <>
                  <View style={{ rowGap: 14 }}>
                    <InputField
                      label={t("password")}
                      password
                      onChangeText={props.handleChange("password")}
                      value={props.values.password}
                      error={props.errors.password}
                      onBlur={props.handleBlur("password")}
                      touched={props.touched.password}
                    />
                    <InputField
                      password
                      onChangeText={props.handleChange("confirmPassword")}
                      value={props.values.confirmPassword}
                      label={t("passwordConfirmation")}
                      error={props.errors.confirmPassword}
                      onBlur={props.handleBlur("confirmPassword")}
                      touched={props.touched.confirmPassword}
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.mainCta}
                    onPress={() => props.handleSubmit()}
                  >
                    <Text style={styles.mainCtaText}>{t("done")}</Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
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
    borderRadius: 5,
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

export default ChangePassword;
