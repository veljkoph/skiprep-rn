import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { color } from "../../variables/color";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { DrawerStackParamList } from "./DrawerItems";

const UserInfo = () => {
  const navigation = useNavigation<NavigationProp<DrawerStackParamList>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1614270263016-ce6e3f460154?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
          }}
          style={styles.image}
        />
      </TouchableOpacity>

      <Text style={styles.text}>Name or nickname</Text>
      <View style={styles.line} />
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "column",
    rowGap: 16,
  },
  image: {
    borderRadius: 50,
    height: 70,
    aspectRatio: 1,
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: color.secondary3,
  },
  text: {
    fontSize: 14,
    fontFamily: "Lexend-Medium",
    textTransform: "capitalize",
  },
});
