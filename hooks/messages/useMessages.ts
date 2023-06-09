import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { BASE_URL } from "@env";
import * as SecureStore from "expo-secure-store";

const useMessages = (id: number) => {
  const fetchFunction = async ({ pageParam = 0 }) => {
    const res = await axios.get(`${BASE_URL}/chat/${id}?page=${pageParam}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
      },
    });
    return res?.data;
  };

  return useInfiniteQuery([`chat/${id}`], fetchFunction, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.meta?.current_page < lastPage?.meta?.last_page)
        return lastPage?.meta?.current_page + 1;
      return false;
    },
    staleTime: 20000,
    cacheTime: 20000,
    refetchInterval: 22000,
  });
};
export default useMessages;
