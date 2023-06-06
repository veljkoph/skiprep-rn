import { useQuery } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import axios from "axios";
import { BASE_URL } from "@env";
import * as SecureStore from "expo-secure-store";
import { fetchExercise } from "../../services/courses/exerciseService";

const useExercise = (id: number) =>
  useQuery([`exercises/${id}`], () => fetchExercise(id), {
    onError: async (data) => {
      Toast.show({
        type: "error",
        //@ts-ignore
        text1: data?.response?.data?.message
          ? //@ts-ignore
            data?.response?.data?.message
          : "Check connection",
      });
    },
    retry: false,
    refetchOnReconnect: true,
    enabled: !!id,
  });
export default useExercise;
