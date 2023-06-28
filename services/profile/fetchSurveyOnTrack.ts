import axios from "axios";
import { BASE_URL } from "@env";
import * as SecureStore from "expo-secure-store";

export const fetchSurveyOnTrack = async () => {
  const res = await axios.get(`${BASE_URL}/user-on-track-fields`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
    },
  });
  return res?.data;
};
