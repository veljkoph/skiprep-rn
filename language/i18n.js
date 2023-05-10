import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./en";
import { srb } from "./srb";

const fallbackLng = ["srb"];
const availableLanguages = ["srb", "en"];

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  fallbackLng,
  detection: {
    checkWhitelist: true,
  },
  resources: {
    en: {
      translation: en,
    },
    srb: {
      translation: srb,
    },
  },
  debug: false,
  whitelist: availableLanguages,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
