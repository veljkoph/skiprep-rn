import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@env";
import * as SecureStore from "expo-secure-store";
import useUserStore from "../../store/useUserStore";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useTranslation } from "react-i18next";

const useLogout = () => {
  const { setUser } = useUserStore();
  const { t } = useTranslation();
  const logout = async () => {
    try {
      axios.post(`${BASE_URL}/logout`, {
        headers: {
          authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return useMutation((values) => logout(), {
    onSuccess: (data) => {
      setUser(null);
      Toast.show({
        type: "error",
        //@ts-ignore
        text1: `${t("loggedOut")}`,
      });
    },
    onError: (data) => {
      console.log("errro");
      Toast.show({
        type: "error",
        //@ts-ignore
        text1: data?.response?.data?.message,
      });
    },
  });
};

export default useLogout;
