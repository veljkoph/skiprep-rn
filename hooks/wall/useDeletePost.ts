import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { BASE_URL } from "@env";
import * as SecureStore from "expo-secure-store";
import { useTranslation } from "react-i18next";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { DrawerStackParamList } from "../../navigation/DrawerNavigation/DrawerItems";
import { ProfileStackParamList } from "../../navigation/Stacks/ProfileStack";
//proveri da li radi bez multipart form data
const useDeletePost = () => {
  const navigation = useNavigation<NavigationProp<ProfileStackParamList>>();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(
    async (values: any) =>
      axios.post(`${BASE_URL}/wall-delete/${values}`, values, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
        },
      }),
    {
      onSuccess: async (data) => {
        Toast.show({
          type: "success",
          //@ts-ignore
          text1: t("postDeleted"),
        });
        queryClient.invalidateQueries([`user-wall`]);
        setTimeout(() => {
          navigation.navigate("ProfileInfo");
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

export default useDeletePost;
