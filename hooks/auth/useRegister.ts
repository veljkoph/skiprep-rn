import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "@env";

interface IRegister {
  email: string;
  name: string;
  password: string;
  //passwordConfirmation?: string;
}

const useRegister = () => {
  const navigation = useNavigation();

  return useMutation(
    (values: IRegister) => axios.post(`${BASE_URL}/register`, values),
    {
      onSuccess: async (data) => {
        Toast.show({
          type: "success",
          text1: "You are registered",
        });
      },
      onError: async (data) => {
        Toast.show({
          type: "error",
          //@ts-ignore
          text1: data?.response?.data?.message,
        });
      },
    }
  );
};

export default useRegister;
