import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { color } from "../../variables/color";
import useImagePicker from "../../hooks/global/useImagePicker";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { BASE } from "@env";
import { ProfileStackParamList } from "../../navigation/Stacks/ProfileStack";
import useUserWall from "../../hooks/wall/useUserWall";
import Loader from "../global/Loader";
import { IPost } from "../../screens/profile/Post";

const { width } = Dimensions.get("screen");
// const posts = [
//   {
//     id: 0,
//     img: "https://images.unsplash.com/photo-1614270262860-f20d4c6ab4f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
//   },
//   {
//     id: 1,
//     img: "https://images.unsplash.com/photo-1519049069275-dea996e1a314?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
//   },
//   {
//     id: 2,
//     img: "https://images.unsplash.com/photo-1610136389511-66e68fae9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
//   },
//   {
//     id: 3,
//     img: "https://images.unsplash.com/photo-1638915297464-94e685026130?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
//   },
// ];

const Posts = () => {
  const navigation = useNavigation<NavigationProp<ProfileStackParamList>>();
  const { data: posts, isLoading, isError } = useUserWall(1);
  console.log(posts);
  if (isLoading) return <Loader />;
  if (isError) return null;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addPost}
        onPress={() => navigation.navigate("CreatePost")}
      >
        <Image source={require("../../assets/icons/add.png")} />
      </TouchableOpacity>
      {posts?.map((post: IPost) => (
        <TouchableOpacity
          key={post.id}
          onPress={() =>
            navigation.navigate("Post", {
              image: "uri",
            })
          }
        >
          <Image style={styles.post} source={{ uri: `${BASE}${post.image}` }} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  post: {
    width: width / 3 - 2,
    height: width / 3 - 2,
    resizeMode: "cover",
    margin: 1,
  },
  addPost: {
    width: width / 3 - 2,
    height: width / 3 - 2,
    backgroundColor: color.white,
    alignItems: "center",
    justifyContent: "center",
    margin: 1,
  },
});
