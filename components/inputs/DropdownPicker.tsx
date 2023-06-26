import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

interface IDropdownPicker {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  def;
}

const DropdownPicker = (props: IDropdownPicker) => {
  const { setFieldValue } = props;
  return (
    <View style={styles.container}>
      <DropDownPicker
        items={sexOptions}
        defaultValue={selectedSex}
        placeholder="Select sex"
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        itemStyle={styles.dropdownItem}
        dropDownStyle={styles.dropdownMenu}
        onChangeItem={(item) => setFieldValue(item.value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownContainer: {
    height: 40,
    width: 200,
  },
  dropdown: {
    backgroundColor: "#fafafa",
  },
  dropdownItem: {
    justifyContent: "flex-start",
  },
  dropdownMenu: {
    backgroundColor: "#fafafa",
  },
});

export default DropdownPicker;
