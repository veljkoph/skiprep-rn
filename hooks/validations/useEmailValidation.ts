import { useTranslation } from "react-i18next";
import * as yup from "yup";

const useEmailValidation = () => {
  const { t } = useTranslation();

  const EmailSchema = yup.object({
    email: yup
      .string()
      .email(`${t("emailValid")}`)
      .required(`${t("requiredField")}`)
      .min(6, `${t("emailValid")}`),
  });
  return EmailSchema;
};
export default useEmailValidation;
