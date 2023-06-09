import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
const { width } = Dimensions.get("screen");
const posts = [
  {
    id: 0,
    img: "https://images.unsplash.com/photo-1614270262860-f20d4c6ab4f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
  },
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1519049069275-dea996e1a314?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1610136389511-66e68fae9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1638915297464-94e685026130?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
];

const Posts = () => {
  return (
    <View style={styles.container}>
      {posts.map((post) => (
        <Image style={styles.post} source={{ uri: post.img }} key={post.id} />
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
});
