import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { color } from "../../variables/color";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import Ionicons from "react-native-vector-icons/Ionicons";
import useLanguageStore from "../../store/useLanguageStore";
import { useTranslation } from "react-i18next";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../navigation/GuestNavigation/GuestStack";

const { width, height } = Dimensions.get("screen");
interface IChangeLanguage {
  setIsCodeOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResetCode = (props: IChangeLanguage) => {
  const { setIsCodeOpen } = props;
  const { t } = useTranslation();
  const { setLanguage } = useLanguageStore();
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [iprops, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const submitHandler = () => {
    setIsCodeOpen(false);
    navigation.navigate("ChangePassword");
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={10} style={styles.blur} tint="dark">
        <Animated.View
          entering={SlideInDown.duration(350)}
          exiting={SlideOutDown.duration(350)}
          style={styles.langContainer}
        >
          <View style={styles.globe}>
            <Ionicons
              color={color.white}
              name={"lock-open-outline"}
              size={32}
            />
          </View>
          <Text style={styles.title}>{t("enterCodeFromEmail")}</Text>

          <CodeField
            ref={ref}
            {...iprops}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={setValue}
            cellCount={4}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                <Text style={styles.cellText}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />

          <View style={{ rowGap: 16, paddingTop: 10 }}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => submitHandler()}
            >
              <Text style={styles.btnText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </BlurView>
    </View>
  );
};

export default ResetCode;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "",
    zIndex: 10,
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
    height: "55%",
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
    fontSize: 18,
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
    height: height < 700 ? 50 : 60,
    backgroundColor: color.secondary,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontFamily: "Lexend-Medium",
    fontSize: 17,
    textAlign: "center",
    color: color.white,
  },
  icon: {
    height: 44,
    width: 44,
  },

  cell: {
    width: width / 6,
    height: width / 6,
    borderWidth: 2,
    borderColor: "#00000030",
    textAlign: "center",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cellText: {
    fontFamily: "Lexend-Regular",
    fontSize: 24,
    textAlign: "center",
  },
  focusCell: {
    borderColor: color.secondary,
  },
});
