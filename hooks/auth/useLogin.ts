import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import useUserStore from "../../store/useUserStore";

interface iLogin {
  email: string;
  password: string;
}

const useLogin = () => {
  const { setUser } = useUserStore();
  const navigation = useNavigation();

  return useMutation(
    (values: iLogin) =>
      axios.post(`http://192.168.0.111/ski/public/api/login`, values),
    //{email:"email", password:'password"}
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
          //  text2: "Invalid Credentials",
        });
      },
    }
  );
};

export default useLogin;
