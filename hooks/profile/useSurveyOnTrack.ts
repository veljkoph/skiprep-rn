import { useQuery } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { fetchSurveyOnTrack } from "../../services/profile/fetchSurveyOnTrack";

const useSurveyOnTrack = () =>
  useQuery([`survey-on-track`], () => fetchSurveyOnTrack(), {
    onError: async (data) => {
      Toast.show({
        type: "error",
        //@ts-ignore
        text1: data?.response?.data?.message
          ? //@ts-ignore
            data?.response?.data?.message
          : "Check connection",
      });
    },
    retry: false,
    refetchOnReconnect: true,
    //  enabled: !!id,
  });
export default useSurveyOnTrack;
