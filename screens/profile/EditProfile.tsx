import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import InputField from "../../components/inputs/InputField";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import { sexOptions } from "../../variables/sex";
import SelectDropdown from "react-native-select-dropdown";
import Ionicons from "react-native-vector-icons/Ionicons";
import { color } from "../../variables/color";
import useEditProfile from "../../hooks/profile/useEditProfile";
import useProfile from "../../hooks/profile/useProfile";
import { years } from "../../variables/years";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native-paper";

const EditProfile = () => {
  const { t } = useTranslation();
  const { mutate: editProfile, isLoading: isEditing } = useEditProfile();
  const { data: user, isLoading } = useProfile(3);
  const { bottom } = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <Formik
        //  validationSchema={LoginSchema}name, email, gender, birth_year, image

        initialValues={{
          name: user?.name,
          email: user?.email,
          gender: user?.gender,
          birth_year: user?.birth_year,
          user_id: 3,
        }}
        enableReinitialize
        onSubmit={(values) => {
          console.log(values, "val");
          editProfile(values);
        }}
      >
        {(props) => (
          <ScrollView
            contentContainerStyle={{
              justifyContent: "space-between",
              flex: 1,
              paddingTop: 20,
            }}
          >
            <View style={{ rowGap: 14 }}>
              <InputField
                label={t("email")}
                onChangeText={props.handleChange("email")}
                value={props.values.email}
                error={props.errors.email}
                onBlur={props.handleBlur("email")}
                disabled
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

              <SelectDropdown
                data={sexOptions}
                defaultValue={sexOptions.find(
                  (element) => element.value === props.values.gender
                )}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                  props.setFieldValue("gender", selectedItem.value);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.label;
                }}
                rowTextForSelection={(item, index) => {
                  return item.label;
                }}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                dropdownIconPosition={"right"}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <Ionicons
                      color={color.secondary3}
                      name="male-female-outline"
                      size={20}
                      style={{ marginTop: 0, marginRight: 12 }}
                    />
                  );
                }}
              />
              <SelectDropdown
                data={years}
                defaultValue={years.find(
                  (element) => element.label === props.values.birth_year
                )}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                  props.setFieldValue("birth_year", selectedItem.label);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.label;
                }}
                rowTextForSelection={(item, index) => {
                  return item.label;
                }}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                dropdownIconPosition={"right"}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
                renderDropdownIcon={(isOpened) => {
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
            {isEditing && (
              <ActivityIndicator size="large" color={color.primaryLight} />
            )}
            <TouchableOpacity
              disabled={isEditing}
              onPress={() => props.handleSubmit()}
              style={[
                styles.submitBtn,
                {
                  marginBottom: bottom + 60,
                  backgroundColor: isEditing
                    ? color.secondary3Light
                    : color.secondary4,
                },
              ]}
            >
              <Text style={styles.submitBtnText}>{t("save")}</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
};

export default EditProfile;

const height = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
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

  submitBtn: {
    backgroundColor: color.secondary4,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
  },
  submitBtnText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Lexend-Regular",

    fontSize: 14,
  },
});
