import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { color } from "../../variables/color";
import useImagePicker from "../../hooks/global/useImagePicker";
import useImageChange from "../../hooks/profile/useImageChange";
import { BASE } from "@env";

interface IProfileImage {
  uri: string;
}

const ProfileImage = (props: IProfileImage) => {
  const { uri } = props;
  const { image, pickImage } = useImagePicker();
  const { mutate: changeImage, isLoading } = useImageChange();
  const submitHandler = () => {
    const formData = new FormData();
    if (image?.assets) {
      const imageUri = image?.assets[0]?.uri;
      const uriArr = imageUri.split(".");
      const fileType = uriArr[uriArr.length - 1];

      formData.append("image", {
        uri: Platform.OS === "ios" ? imageUri.replace("file://", "") : imageUri,
        type: `image/${fileType}`,
        name: `wall/${imageUri}`,
        //  base64: res.base64,
      });

      changeImage(formData);
    }
  };
  useEffect(() => {
    if (image?.assets) {
      submitHandler();
    }
    return;
  }, [image]);

  return (
    <TouchableOpacity onPress={() => pickImage()}>
      {image?.assets && image?.assets[0]?.uri ? (
        <Image style={styles.image} source={{ uri: image?.assets[0]?.uri }} />
      ) : (
        <Image style={styles.image} source={{ uri: `${BASE}${uri}` }} />
      )}
    </TouchableOpacity>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  image: {
    height: 90,
    width: 90,
    resizeMode: "cover",
    borderRadius: 90 / 2,
    borderColor: color.white,
    borderWidth: 5,
  },
});
