import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import useUserStore from "../../store/useUserStore";
import { BASE_URL } from "@env";

interface IMessage {
  id: number;
  text: string;
}

const useSendMessage = () => {
  return useMutation(
    (values: IMessage) => axios.post(`${BASE_URL}/message`, values),

    {
      onSuccess: async (data) => {},
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

export default useSendMessage;
