import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { color } from "../../variables/color";
import { useTranslation } from "react-i18next";
import Posts from "../../components/profile/Posts";

const user = {
  image:
    "https://images.unsplash.com/photo-1594383815406-39916a2a5be8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  username: "Skyuser",
  email: "emailfake@gmail.fake",
  sex: "M",
  year: "1997",
};

const Profile = () => {
  const { t } = useTranslation();

  return (
    <ScrollView bounces={false} contentContainerStyle={styles.container}>
      <View style={{ paddingHorizontal: 10, width: "100%" }}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            <Image style={styles.image} source={{ uri: user.image }} />
          </TouchableOpacity>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              rowGap: 5,
            }}
          >
            <Text style={styles.name}>{user.username}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        </View>
        <View style={styles.mainInfo}>
          <View style={styles.infoItem}>
            <Text style={styles.infoItemTitle}>{t("age")}</Text>
            <Text style={styles.infoItemText}>{user?.year}</Text>
          </View>

          <View style={styles.separator} />
          <View style={styles.infoItem}>
            <Text style={styles.infoItemTitle}>{t("sex")}</Text>
            <Text style={styles.infoItemText}>{user?.year}</Text>
          </View>

          <View style={styles.separator} />
          <View style={styles.infoItem}>
            <Text style={styles.infoItemTitle}>{t("age")}</Text>
            <Text style={styles.infoItemText}>{user?.year}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editBtnText}>{t("editProfile")}</Text>
        </TouchableOpacity>
      </View>
      <Posts />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",

    paddingTop: 20,
    flex: 1,
    alignItems: "center",
  },
  mainInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
  },
  image: {
    height: 110,
    width: 110,
    resizeMode: "cover",
    borderRadius: 110 / 2,
    borderColor: color.white,
    borderWidth: 5,
  },
  infoItem: {
    rowGap: 5,
    alignItems: "center",
  },
  infoItemTitle: {
    color: color.black,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Lexend-Medium",
  },
  infoItemText: {
    color: color.black,
    fontSize: 12,
    fontFamily: "Lexend-Regular",
  },
  separator: {
    width: 2,
    height: "100%",
    backgroundColor: color.secondary3,
  },
  editBtn: {
    backgroundColor: color.secondary1Light,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  editBtnText: {
    color: "#188368",
    fontSize: 14,
    fontFamily: "Lexend-Bold",
  },
  name: {
    color: color.black,
    fontSize: 18,
    fontFamily: "Lexend-Bold",
    textAlign: "center",
  },
  email: {
    color: color.black,
    fontSize: 14,
    fontFamily: "Lexend-Regular",
    textAlign: "center",
  },
});

export default Profile;
