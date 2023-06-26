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
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { BASE } from "@env";
import { ProfileStackParamList } from "../../navigation/Stacks/ProfileStack";
import useUserWall from "../../hooks/wall/useUserWall";
import Loader from "../global/Loader";
import { IPost } from "../../screens/profile/Post";

const { width } = Dimensions.get("screen");

const Posts = () => {
  const navigation = useNavigation<NavigationProp<ProfileStackParamList>>();
  const { data: posts, isLoading, isError } = useUserWall(1);

  if (isLoading) return <Loader loaderColor={color.secondary4} />;
  if (isError) return null;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addPost}
        onPress={() => navigation.navigate("CreatePost")}
      >
        <Image
          style={styles.addPostLogo}
          source={require("../../assets/icons/add.png")}
        />
      </TouchableOpacity>
      {posts?.map((post: IPost) => (
        <TouchableOpacity
          key={post.id}
          onPress={() =>
            navigation.navigate("Post", {
              ...post,
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
    alignItems: "flex-start",
    flex: 1,
    width: "100%",
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
  addPostLogo: {
    height: "50%",
    width: "50%",
    alignSelf: "center",
  },
});
