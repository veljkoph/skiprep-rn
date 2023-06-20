import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { BASE_URL } from "@env";

import { useTranslation } from "react-i18next";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { DrawerStackParamList } from "../../navigation/DrawerNavigation/DrawerItems";
//proveri da li radi bez multipart form data
const useCreatePost = () => {
  const navigation = useNavigation<NavigationProp<DrawerStackParamList>>();
  const { t } = useTranslation();

  return useMutation(
    (values: any) =>
      axios.post(`${BASE_URL}/wall`, values, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    {
      onSuccess: async (data) => {
        console.log(data);
        Toast.show({
          type: "success",
          //@ts-ignore
          text1: t("postCreated"),
        });
        setTimeout(() => {
          navigation.navigate("Home");
        }, 250);
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
