import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import useUserStore from "../../store/useUserStore";
import { BASE_URL } from "@env";

interface iLogin {
  email: string;
  password: string;
}

const useLogin = () => {
  const { setUser } = useUserStore();

  return useMutation(
    (values: iLogin) => axios.post(`${BASE_URL}/login`, values),

    {
      onSuccess: async (data) => {
        setUser(data?.data);
        await SecureStore.setItemAsync("token", data?.data?.access_token);
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

export default useLogin;
