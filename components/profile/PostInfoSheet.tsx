import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { color } from "../../variables/color";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import useDeletePost from "../../hooks/wall/useDeletePost";

interface IProps {
  caption?: string;
  time?: string;
  id: number;
}

const PostInfoSheet = (props: IProps) => {
  const { time, caption, id } = props;
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { mutate: deletePost } = useDeletePost();

  const deleteHandler = () =>
    Alert.alert(t("deletePost"), t("uSure") || "", [
      {
        text: t("no") || "",
        style: "cancel",
      },
      { text: t("yes") || "", onPress: () => deletePost(id) },
    ]);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 70 }]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Image
            style={styles.timeIcon}
            source={require("../../assets/icons/time.png")}
          />
          <Text style={styles.text}>{time}</Text>
        </View>
        <Text style={styles.text}>{caption}</Text>
      </View>
      <TouchableOpacity style={styles.deleteBtn} onPress={deleteHandler}>
        <Text style={styles.deleteBtnText}>{t("delete")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostInfoSheet;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "space-between",
    flex: 1,
  },
  timeIcon: {
    height: 42,
    width: 42,
  },
  text: {
    color: color.black,
    fontSize: 12,
    fontFamily: "Lexend-Light",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteBtn: {
    backgroundColor: color.secondary,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteBtnText: {
    fontSize: 14,
    fontFamily: "Lexend-Medium",
    alignItems: "center",
    justifyContent: "center",
    color: color.white,
  },
});
