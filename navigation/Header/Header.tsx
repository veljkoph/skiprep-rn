import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { color } from "../../variables/color";
import useDrawerStore from "../../store/useDrawerStore";

const Header = () => {
  const navigation = useNavigation();
  const { setDrawer, drawer } = useDrawerStore();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{ marginRight: 10 }}
        onPress={() => setDrawer(!drawer)}
      >
        <Ionicons color="black" name={"menu"} size={30} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: color.white,
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: "flex-end",
  },
});
