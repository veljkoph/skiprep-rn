import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import InputField from "../../components/inputs/InputField";
import { Formik } from "formik";
import useSurveyOnTrack from "../../hooks/profile/useSurveyOnTrack";

const SurveyTrack = () => {
  const { data: questions } = useSurveyOnTrack();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        //  validationSchema={LoginSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {(props) => (
          <>
            <View style={{ rowGap: 14 }}>
              <InputField
                onChangeText={props.handleChange("email")}
                value={props.values.email}
                label="Email"
                error={props.errors.email}
                onBlur={props.handleBlur("email")}
                touched={props.touched.email}
              />
              <InputField
                label={"test"}
                onChangeText={props.handleChange("password")}
                value={props.values.password}
                error={props.errors.password}
                onBlur={props.handleBlur("password")}
                touched={props.touched.password}
              />
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

export default SurveyTrack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
