import { create, SetState } from "zustand";
import * as SecureStore from "expo-secure-store";
import i18n from "../language/i18n";
import { getLocales } from "expo-localization";

interface LanguageStore {
  language: string | null;
  setLanguage: (language: string) => Promise<void>;
}

const useLanguageStore = create<LanguageStore>((set) => ({
  language: null, // set initial value to null
  setLanguage: async (language: string) => {
    // update the selected language in the store
    set({ language: language });
    i18n.changeLanguage(language);
    await SecureStore.setItemAsync("lang", language);
  },
}));

// Load the language from the storage on initialization
(async () => {
  const language = await SecureStore.getItemAsync("lang");
  console.log(language, "from local");
  const deviceLanguage = getLocales()[0].languageCode;
  console.log(deviceLanguage, "device");
  // If the language is not in storage, set the default language
  useLanguageStore.getState().language = language || "sr";
  i18n.changeLanguage(
    language ? language : deviceLanguage ? deviceLanguage : "srb"
  );
})();

export default useLanguageStore;
