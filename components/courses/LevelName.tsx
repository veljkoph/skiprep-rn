import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { color } from "../../variables/color";

interface IProps {
  level: number;
}
interface NameMap {
  [key: number]: string;
}
const LevelName = (props: IProps) => {
  const { level } = props;
  const { t } = useTranslation();

  const names: NameMap = {
    1: t("easy"),
    2: t("medium"),
    3: t("hard"),
    4: t("hard"),
    5: t("hard"),
  };

  const name: string = names[level];

  return (
    <View style={{ flexDirection: "row" }}>
      <Text
        style={{
          fontSize: 12,
          textAlign: "right",
          fontFamily: "Lexend-Regular",
          color: color.black,
        }}
      >
        {t("difficulty")}:
      </Text>
      <Text
        style={{
          fontSize: 12,
          textAlign: "right",
          fontFamily: "Lexend-Regular",
          color: color.black,
        }}
      >
        &nbsp;{name}
      </Text>
    </View>
  );
};

export default LevelName;
