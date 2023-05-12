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
  ActivityIndicator,
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
import { Formik } from "formik";
import useRegisterValidation from "../../hooks/validations/useRegisterValidation";
import useRegister from "../../hooks/auth/useRegister";
import RegisterCode from "./RegisterCode";

const { height } = Dimensions.get("screen");

const Register = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const { t } = useTranslation();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { mutate: register, isLoading, isSuccess, data: user } = useRegister();
  const [isCodeOpen, setIsCodeOpen] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setIsCodeOpen(true);
      return;
    }
  }, [isSuccess]);

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

  const RegisterSchema = useRegisterValidation();

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
      bounces={false}
      keyboardOpeningTime={10}
      extraScrollHeight={100}
    >
      {isLoading && (
        <ActivityIndicator
          color="#fff"
          size="large"
          style={{
            position: "absolute",
            top: "20%",
            zIndex: 10,
            right: 20,
          }}
        />
      )}

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
            <Formik
              validationSchema={RegisterSchema}
              initialValues={{
                email: "",
                name: "",
                password: "",
                // passwordConfirmation: "",
              }}
              onSubmit={(values) => register(values)}
            >
              {(props) => (
                <>
                  <View style={{ rowGap: 14 }}>
                    <InputField
                      onChangeText={props.handleChange("email")}
                      value={props.values.email}
                      label="Email"
                      error={props.errors.email}
                      onBlur={props.handleBlur("email")}
                      touched={props.touched.email}
                    />
                    <InputField
                      onChangeText={props.handleChange("name")}
                      value={props.values.name}
                      label={t("nickname")}
                      error={props.errors.name}
                      onBlur={props.handleBlur("name")}
                      touched={props.touched.name}
                    />
                    <InputField
                      label={t("password")}
                      password
                      onChangeText={props.handleChange("password")}
                      value={props.values.password}
                      error={props.errors.password}
                      onBlur={props.handleBlur("password")}
                      touched={props.touched.password}
                    />
                    {/* <InputField
                      label={t("passwordConfirmation")}
                      password
                      onChangeText={props.handleChange("passwordConfirmation")}
                      value={props.values.passwordConfirmation}
                      error={props.errors.passwordConfirmation}
                      onBlur={props.handleBlur("passwordConfirmation")}
                      touched={props.touched.passwordConfirmation}
                    /> */}
                  </View>

                  <TouchableOpacity
                    style={isLoading ? styles.disabled : styles.mainCta}
                    onPress={() => props.handleSubmit()}
                    disabled={isLoading}
                  >
                    <Text style={styles.mainCtaText}>{t("register")}</Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
            {/* </View> */}
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
      {isCodeOpen && (
        <RegisterCode userId={user?.data} setIsCodeOpen={setIsCodeOpen} />
      )}
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    //    flex: 1,
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
  disabled: {
    height: height < 700 ? 50 : 60,
    backgroundColor: color.secondary3,
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
