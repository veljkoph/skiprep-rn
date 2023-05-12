import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { color } from "../../variables/color";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import Ionicons from "react-native-vector-icons/Ionicons";
import useLanguageStore from "../../store/useLanguageStore";
import { useTranslation } from "react-i18next";

interface IChangeLanguage {
  setlangOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangeLanguage = (props: IChangeLanguage) => {
  const { setlangOpen } = props;
  const { t } = useTranslation();
  const { setLanguage } = useLanguageStore();

  const changeHandler = (lang: string) => {
    setLanguage(lang);
    setlangOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        style={styles.closeMenu}
        onPress={() => setlangOpen(false)}
      >
        <BlurView intensity={10} style={styles.blur} tint="dark">
          <Animated.View
            entering={SlideInDown.duration(350)}
            exiting={SlideOutDown.duration(350)}
            style={styles.langContainer}
          >
            <View style={styles.globe}>
              <Ionicons color={color.white} name={"globe-outline"} size={32} />
            </View>
            <Text style={styles.title}>{t("changeLang")}</Text>
            <View style={{ rowGap: 16, paddingTop: 10 }}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => changeHandler("sr")}
              >
                <Image
                  style={styles.icon}
                  source={require("../../assets/flags/sr.png")}
                />
                <Text style={styles.btnText}>Srpski</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => changeHandler("en")}
              >
                <Image
                  style={styles.icon}
                  source={require("../../assets/flags/en.png")}
                />
                <Text style={styles.btnText}>English</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </BlurView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ChangeLanguage;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",

    zIndex: 12,
  },
  blur: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,

    justifyContent: "flex-end",
  },
  langContainer: {
    height: "45%",
    backgroundColor: color.white,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 60,
    padding: 20,
    rowGap: 32,
  },
  title: {
    fontFamily: "Lexend-Medium",
    fontSize: 24,
    textAlign: "center",
  },
  closeMenu: {
    height: "55%",
    width: "100%",
  },
  globe: {
    position: "absolute",
    left: "50%",
    transform: [
      {
        translateX: -14,
      },
    ],
    padding: 20,
    top: -35,
    backgroundColor: color.primary2,
    borderRadius: 10,
    shadowColor: color.primary1,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.3,
    shadowRadius: 14.0,
    elevation: 24,
  },
  btn: {
    columnGap: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    height: 44,
    width: 44,
  },
  btnText: { fontFamily: "Lexend-Regular", fontSize: 16, textAlign: "center" },
});
