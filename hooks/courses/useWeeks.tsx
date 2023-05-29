import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@env";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";

const fetchFunction = async (id: number | undefined) => {
  const res = await axios.get(`${BASE_URL}/weeks/${id}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
    },
  });
  return res?.data;
};

const useWeeks = (id: number | undefined) =>
  useQuery([`weeks/${id}`], () => fetchFunction(id), {
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
  });
export default useWeeks;
