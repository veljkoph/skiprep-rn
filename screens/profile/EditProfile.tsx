import {
  Dimensions,
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

const EditProfile = () => {
  const { t } = useTranslation();
  const { mutate: editProfile } = useEditProfile();

  return (
    <View style={styles.container}>
      <Formik
        //  validationSchema={LoginSchema}name, email, gender, birth_year, image

        initialValues={{
          name: "",
          email: "",
          gender: "",
          birth_year: "",
          user_id: 3,
        }}
        onSubmit={(values) => {
          console.log(values);
          editProfile(values);
        }}
      >
        {(props) => (
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
              label={t("name")}
              error={props.errors.name}
              onBlur={props.handleBlur("name")}
              touched={props.touched.name}
            />

            <SelectDropdown
              data={sexOptions}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                props.setFieldValue("gender", selectedItem.label);
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
                    style={{ marginTop: 0 }}
                  />
                );
              }}
            />

            <TouchableOpacity
              onPress={() => props.handleSubmit()}
              style={styles.submitBtn}
            >
              <Text style={styles.submitBtnText}>Save</Text>
            </TouchableOpacity>
          </View>
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
    padding: 20,
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
    color: "#444",
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
    color: "#444",
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
