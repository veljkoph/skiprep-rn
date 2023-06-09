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
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ProfileStackParamList } from "../../navigation/Stacks/ProfileStack";
import useProfile from "../../hooks/profile/useProfile";
import ProfileImage from "../../components/profile/ProfileImage";

const Profile = () => {
  const { t } = useTranslation();
  const { data: user, isLoading } = useProfile(3);
  const navigation = useNavigation<NavigationProp<ProfileStackParamList>>();

  if (isLoading) return null;
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
          <ProfileImage uri={user?.image} />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              rowGap: 5,
            }}
          >
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
        </View>
        <View style={styles.mainInfo}>
          <View style={styles.infoItem}>
            <Text style={styles.infoItemTitle}>{t("age")}</Text>
            <Text style={styles.infoItemText}>{user?.birth_year}</Text>
          </View>

          <View style={styles.separator} />
          <View style={styles.infoItem}>
            <Text style={styles.infoItemTitle}>{t("sex")}</Text>
            <Text style={styles.infoItemText}>{user?.gender}</Text>
          </View>

          <View style={styles.separator} />
          <View style={styles.infoItem}>
            <Text style={styles.infoItemTitle}>{t("age")}</Text>
            <Text style={styles.infoItemText}>{user?.year}</Text>
          </View>
        </View>
        <View style={styles.profileBtns}>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Text style={styles.editBtnText}>{t("editProfile")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.skiOnTrack}
            onPress={() => navigation.navigate("SurveyTrack")}
          >
            <Text style={styles.editBtnText}>{t("skiOnTrack")}</Text>
          </TouchableOpacity>
        </View>
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
  profileBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 10,
  },
  editBtn: {
    backgroundColor: "#188368",
    // width: "100%",
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
  },
  skiOnTrack: {
    backgroundColor: color.secondary,
    // width: "100%",
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
  },
  editBtnText: {
    color: color.white,
    fontSize: 12,
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
