import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

const useRegister = () => {
  const navigation = useNavigation();

  return useMutation(
    (values) =>
      axios.post(
        `http://192.168.0.52/Project/axios_handlers/axios_signup_user.php`,
        values
      ),
    {
      onSuccess: async (data) => {
        console.log(data);
        Toast.show({
          type: "success",
          text1: data?.data.success,
        });
      },
      onError: async (data) => {
        console.log(data);
        Toast.show({
          type: "error",
          //  text1: data.status == 401 ? "Invalid Credentials" : "jdjdjhj",
          text2: "Invalid Credentials",
        });
      },
    }
  );
};

export default useRegister;
