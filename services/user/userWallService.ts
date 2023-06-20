import axios from "axios";
import { BASE_URL } from "@env";
import * as SecureStore from "expo-secure-store";

export const fetchUserWall = async (id: number) => {
  const res = await axios.get(`${BASE_URL}/wall-user/${id}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
    },
  });
  return res?.data;
};
