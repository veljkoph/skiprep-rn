import { useTranslation } from "react-i18next";
import * as yup from "yup";

const usePasswordChangeValidation = () => {
  const { t } = useTranslation();

  const PasswordShema = yup.object({
    password: yup
      .string()
      .required(`${t("requiredField")}`)
      .min(8, `${t("passwordLength")}`),
    confirmPassword: yup
      .string()
      .required(`${t("requiredField")}`)
      .min(8, `${t("passwordLength")}`),
  });
  return PasswordShema;
};
export default usePasswordChangeValidation;
