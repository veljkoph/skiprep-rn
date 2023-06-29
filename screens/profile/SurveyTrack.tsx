import {
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import InputField from "../../components/inputs/InputField";
import { Formik } from "formik";
import useSurveyOnTrack from "../../hooks/profile/useSurveyOnTrack";
import SurveyInput from "../../components/profile/SurveyInput";
import { color } from "../../variables/color";

interface IQuestion {
  name: string;
  type: string;
  text: string;
  answers: string[];
}

const SurveyTrack = () => {
  const { data: questions } = useSurveyOnTrack();

  return (
    <Formik
      //  validationSchema={LoginSchema}
      initialValues={{ name: "", height: "" }}
      onSubmit={(values) => console.log(values)}
    >
      {(props) => (
        <ScrollView contentContainerStyle={styles.container}>
          {questions?.map((question: IQuestion, index: number) => (
            <SurveyInput key={question.name} {...question} {...props} />
          ))}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => props.handleSubmit()}
          >
            <Text style={styles.btnText}>123</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </Formik>
  );
};

export default SurveyTrack;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
    rowGap: 20,
  },
  btn: {
    padding: 15,
    backgroundColor: color.secondary,
    borderRadius: 5,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontFamily: "Lexend-Regular",
    fontSize: 14,
  },
});
