import { useTranslation } from "react-i18next";
import * as yup from "yup";

const useRegisterValidation = () => {
  const { t } = useTranslation();

  const LoginSchema = yup.object({
    email: yup
      .string()
      .email(`${t("emailValid")}`)
      .required(`${t("requiredField")}`)
      .min(6, `${t("emailValid")}`),
    password: yup
      .string()
      .required(`${t("requiredField")}`)
      .min(8, `${t("passwordLength")}`),
    name: yup
      .string()
      .required(`${t("requiredField")}`)
      .min(4, "Too short"),
  });
  return LoginSchema;
};
export default useRegisterValidation;
