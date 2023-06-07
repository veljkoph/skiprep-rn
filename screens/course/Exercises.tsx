import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { RouteProp } from "@react-navigation/native";
import { CourseStackParamList } from "../../navigation/CourseStack/CourseStack";
import useTrainings from "../../hooks/courses/useTrainings";
import { color } from "../../variables/color";
import Week from "../../components/courses/Week";
import Training from "../../components/courses/Training";
import { ActivityIndicator } from "react-native-paper";
import useExercise from "../../hooks/courses/useExercise";
import { useTranslation } from "react-i18next";
import Exercise from "../../components/courses/Exercise";
type ExercisesProp = RouteProp<CourseStackParamList, "Exercises">;

interface IExerciseProps {
  route: ExercisesProp;
}

const Exercises = (props: IExerciseProps) => {
  const { route } = props;
  const { data: trainings, isLoading } = useExercise(route?.params?.trainingId);
  const { t } = useTranslation();

  if (isLoading) {
    // Render a spinner or loading indicator while the data is loading
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={color.primary} />
      </View>
    );
  }
  //VEZBEE
  return (
    <View>
      <FlatList
        data={trainings}
        ListHeaderComponent={() => (
          <Text style={styles.title}>{t("exercises")}</Text>
        )}
        renderItem={({ item }) => <Exercise {...item} />}
        keyExtractor={(item) => item.id.toString()}
        scrollEventThrottle={16}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
      />
    </View>
  );
};

export default Exercises;

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: color.white,
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: "Lexend-Regular",
    textTransform: "capitalize",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
