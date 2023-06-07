import { View, Text, Image, ScrollView, Dimensions } from "react-native";
import React from "react";
const { height } = Dimensions.get("screen");
const Home = () => {
  return (
    <ScrollView>
      <Text>Home3</Text>
      <Image
        style={{ height: height, width: "100%" }}
        source={{
          uri: "https://images.unsplash.com/photo-1684863926585-a50c68aa6082?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
        }}
      />
      <Image
        style={{ height: height, width: "100%" }}
        source={{
          uri: "https://plus.unsplash.com/premium_photo-1664547606960-008623079291?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        }}
      />
      <Image
        style={{ height: height, width: "100%" }}
        source={{
          uri: "https://images.unsplash.com/photo-1684863926585-a50c68aa6082?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
        }}
      />
    </ScrollView>
  );
};

export default Home;
