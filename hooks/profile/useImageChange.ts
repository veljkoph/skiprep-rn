import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { BASE_URL } from "@env";
import { useTranslation } from "react-i18next";

//proveri da li radi bez multipart form data
const useImageChange = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(
    (values: any) =>
      axios.post(`${BASE_URL}/user-basic/3`, values, {
        headers: { "Content-Type": "multipart/form-data" },
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

export default useImageChange;
