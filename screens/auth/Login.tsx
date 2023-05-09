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
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../components/auth/Header";
import InputField from "../../components/inputs/InputField";
import { color } from "../../variables/color";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const { height } = Dimensions.get("screen");

const Login = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      behavior={Platform?.OS === "ios" ? "padding" : "height"}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
      keyboardOpeningTime={10}
      extraScrollHeight={100}
    >
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
            title={`Login to \nyour account`}
            subtitle="Enter your email and password"
          />
          <View style={styles.form}>
            <View style={{ rowGap: 14 }}>
              <InputField label="Email" />
              <InputField label="Password" password />
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mainCta}>
              <Text style={styles.mainCtaText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text>Dont have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.secondaryCtaText}>Register</Text>
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

export default Login;
