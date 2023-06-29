import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import useLanguageStore from "../../store/useLanguageStore";

const MultipleDropdown = (props: any) => {
  const { answers, setFieldValue, name, label, icon } = props;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
  const { language } = useLanguageStore();
  console.log(language);
  DropDownPicker.addTranslation("sr", {
    PLACEHOLDER: "Izaberi",
    SEARCH_PLACEHOLDER: "Pretraži...",
    SELECTED_ITEMS_COUNT_TEXT: "{count}. izabranih elemenata", // See below for advanced options
    NOTHING_TO_SHOW: "Nema ničega za prikazivanje",
  });

  DropDownPicker.setLanguage(language || "sr");
  const { t } = useTranslation();
  return (
    <View style={{ flexDirection: "column", rowGap: 10 }}>
      <Text style={{ fontSize: 14, fontFamily: "Lexend-Regular" }}>
        {label}
      </Text>

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        placeholder={t("selectOption") || ""}
        placeholderStyle={{
          color: "#000",
          textAlign: "left",
          fontFamily: "Lexend-Regular",
          fontSize: 14,
          paddingLeft: 7,
        }}
        setItems={(item) => console.log(item)}
        onChangeValue={(item) => setFieldValue(name.toString(), item)}
        multiple={true}
        min={0}
        max={5}
        listMode="MODAL"
        style={{
          borderWidth: 0,
          borderRadius: 5,
        }}
      />
    </View>
  );
};
export default MultipleDropdown;
