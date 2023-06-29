import { StyleSheet, Text, View } from "react-native";
import React from "react";
import InputField from "../inputs/InputField";
import ClassicInput from "../inputs/ClassicInput";
import SelectDropdownString from "../inputs/SelectDropdownString";
import MultipleDropdown from "../inputs/MultipleDropdown";

const SurveyInput = (props) => {
  const {
    name,
    type,
    answers,
    text,
    setFieldValue,
    handleChange,
    values,
    errors,
    handleBlu,
    touched,
  } = props;
  const components = {
    text: ClassicInput,
    select: SelectDropdownString,
    multiple_custom: MultipleDropdown,
    multiple: MultipleDropdown,
  };
  const TaskType = components[type || "error"];

  if (!name) return null;
  return (
    <View>
      <TaskType
        label={text}
        onChangeText={handleChange(name)}
        value={values?.name}
        error={errors?.name}
        onBlur={props?.handleBlur(name)}
        touched={touched?.name}
        answers={answers}
        setFieldValue={setFieldValue}
        name={name}
      />
    </View>
  );
};

export default SurveyInput;

const styles = StyleSheet.create({});
