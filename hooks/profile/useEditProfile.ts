import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { BASE_URL } from "@env";

import { useTranslation } from "react-i18next";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { DrawerStackParamList } from "../../navigation/DrawerNavigation/DrawerItems";
//proveri da li radi bez multipart form data
const useEditProfile = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(
    (values: any) =>
      axios.post(`${BASE_URL}/user-basic/${values.user_id}`, values, {
        headers: {},
      }),
    {
      onSuccess: async (data) => {
        queryClient.invalidateQueries([`user-basic`]);
        Toast.show({
          type: "success",
          //    @ts-ignore
          text1: t("editSuccessful"),
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

export default useEditProfile;
