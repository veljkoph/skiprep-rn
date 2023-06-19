import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { BASE_URL } from "@env";

const useCreatePost = () => {
  return useMutation(
    (values: any) =>
      axios.post(`${BASE_URL}/wall`, values, {
        headers: { "Content-Type": "multipart/form-data" },
      }),

    {
      onSuccess: async (data) => {
        Toast.show({
          type: "success",
          //@ts-ignore
          text1: data?.response?.data?.message,
        });
      },
      onError: async (data) => {
        Toast.show({
          type: "error",
          //@ts-ignore
          text1: data?.response?.data?.message,
        });
      },
      retry: 0,
    }
  );
};

export default useCreatePost;
