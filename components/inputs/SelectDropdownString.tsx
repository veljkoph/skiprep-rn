import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { color } from "../../variables/color";
import Ionicons from "react-native-vector-icons/Ionicons";
import SelectDropdown from "react-native-select-dropdown";
import { useTranslation } from "react-i18next";

const SelectDropdownString = (props: any) => {
  const { answers, setFieldValue, name, label, icon } = props;
  const { t } = useTranslation();
  return (
    <View style={{ flexDirection: "column", rowGap: 10 }}>
      <Text style={{ fontSize: 14, fontFamily: "Lexend-Regular" }}>
        {label}
      </Text>
      <SelectDropdown
        data={answers}
        //   defaultValue={data.find(
        //     (element) => element.label === props.values.birth_year
        //   )}

        defaultButtonText={t("selectOption") || ""}
        onSelect={(selectedItem, index) => {
          setFieldValue(name, selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        buttonStyle={styles.dropdown1BtnStyle}
        buttonTextStyle={styles.dropdown1BtnTxtStyle}
        dropdownIconPosition={"right"}
        dropdownStyle={styles.dropdown1DropdownStyle}
        rowStyle={styles.dropdown1RowStyle}
        rowTextStyle={styles.dropdown1RowTxtStyle}
        renderDropdownIcon={(isOpened) => {
          if (icon)
            return (
              <Ionicons
                color={color.secondary3}
                name="calendar-outline"
                size={20}
                style={{ marginTop: 0, marginRight: 12 }}
              />
            );
        }}
      />
    </View>
  );
};

export default SelectDropdownString;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
  dropdownText: {
    backgroundColor: "white",
    borderRadius: 10,
    flex: 1,
  },
  dropdown1BtnStyle: {
    width: "100%",
    height: height < 700 ? 50 : 65,
    backgroundColor: "#FFF",
    borderRadius: 5,
    shadowColor: "#8a8a8a",
    shadowOffset: {
      width: 2,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 1.41,
    elevation: 1,
  },
  dropdown1BtnTxtStyle: {
    color: "#000",
    textAlign: "left",
    fontSize: 14,
    fontFamily: "Lexend-Regular",
  },
  dropdown1DropdownStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",

    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: {
    color: "#000",
    textAlign: "left",
    fontFamily: "Lexend-Regular",

    fontSize: 14,
  },
});
