import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BASE } from "@env";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { color } from "../../variables/color";
import Ionicons from "react-native-vector-icons/Ionicons";

interface IPost {
  caption: string;
  created_at: Date;
  id: number;
  image: string;
  updated_at: Date;
  user_id?: number;
}
dayjs.extend(relativeTime);

const Post = (props: IPost) => {
  const { caption, created_at, image } = props;

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 4,
          paddingHorizontal: 5,
          columnGap: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: 8,
          }}
        >
          <Image
            style={styles.profileImg}
            source={{
              uri: "https://images.unsplash.com/photo-1686676831449-3589ad6b10da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            }}
          />
          <View>
            <Text style={styles.userName}>Korisnik 12</Text>
            <Text style={styles.location}>
              <Ionicons
                color={color.secondary3}
                name="location-outline"
                size={18}
              />
              Austria
            </Text>
          </View>
        </View>
        <Text style={styles.time}>{dayjs(created_at)?.fromNow()}</Text>
      </View>
      <Image style={styles.image} source={{ uri: `${BASE}${image}` }} />

      <Text style={styles.desc}>{caption}</Text>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },
  image: {
    flex: 1,
    resizeMode: "contain",
    height: "auto",
  },
  profileImg: {
    borderRadius: 50,
    height: 45,
    aspectRatio: 1,

    resizeMode: "cover",
  },
  userName: {
    color: color.black,
    fontSize: 14,
    fontFamily: "Lexend-Regular",
  },
  time: {
    color: color.secondary3,
    fontSize: 14,
    fontFamily: "Lexend-Regular",
  },
  desc: {
    color: color.black,
    fontSize: 14,
    fontFamily: "Lexend-Light",
    padding: 5,
  },
  location: {
    color: color.secondary3,
    fontSize: 12,
    fontFamily: "Lexend-Regular",
    alignItems: "center",
    justifyContent: "center",
  },
});
