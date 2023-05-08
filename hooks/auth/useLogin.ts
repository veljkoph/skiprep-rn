import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import useUserStore from "../../store/useUserStore";

const useLogin = () => {
  const { setUser } = useUserStore();
  const navigation = useNavigation();

  return useMutation(
    (values) =>
      axios.post(
        `http://192.168.0.52/Project/axios_handlers/axios_login_user.php`,
        values
      ),
    {
      onSuccess: async (data) => {
        setUser(data?.data);
        await SecureStore.setItemAsync("token", data?.data?.token);
      },
      onError: async (data) => {
        // console.log(data.response.status);
        Toast.show({
          type: "error",
          // text1: data?.response?.status == 401 && "Invalid Credentials",
          text2: "Invalid Credentials",
        });
      },
    }
  );
};

export default useLogin;
