import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "@env";
import useUserStore from "../../store/useUserStore";

interface IRegister {
  id: number;
  verification_code: string;
}

const useVerify = () => {
  const { setUser } = useUserStore();

  return useMutation(
    (values: IRegister) => axios.post(`${BASE_URL}/verify`, values),
    {
      onSuccess: async (data) => {
        setUser(data?.data?.user);
        await SecureStore.setItemAsync("token", data?.data?.access_token);
        Toast.show({
          type: "success",
          text1: "You are verified",
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

export default useVerify;
