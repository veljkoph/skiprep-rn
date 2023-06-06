import axios from "axios";
import { BASE_URL } from "@env";
import * as SecureStore from "expo-secure-store";

export const fetchExercise = async (id: number) => {
  const res = await axios.get(`${BASE_URL}/exercises/${id}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
    },
  });
  return res?.data;
};
