import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import useImagePicker from "../../hooks/global/useImagePicker";
import { color } from "../../variables/color";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import { ActivityIndicator } from "react-native-paper";
import LineInput from "../../components/inputs/LineInput";
import useCreatePost from "../../hooks/wall/useCreatePost";

interface IForm {
  caption?: string;
  location?: string;
}
const CreatePost = () => {
  const { pickImage, image } = useImagePicker();
  const { t } = useTranslation();
  const { mutate: createPost, isLoading } = useCreatePost();

  const submitHandler = (values: IForm) => {
    const formData = new FormData();
    if (image?.assets) {
      const imageUri = image?.assets[0]?.uri;
      const uriArr = imageUri.split(".");
      const fileType = uriArr[uriArr.length - 1];
      console.log(fileType);
      formData.append("image", {
        uri: Platform.OS === "ios" ? imageUri.replace("file://", "") : imageUri,
        type: `image/${fileType}`,
        name: `wall/${imageUri}`,
        //  base64: res.base64,
      });

      if (values.caption) {
        formData.append("caption", values.caption);
      }
      if (values.location) {
        formData.append("location", values.location);
      }
      createPost(formData);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.title}>{t("createPost")}</Text> */}
      <TouchableOpacity
        style={[
          styles.imageBtn,
          {
            paddingVertical: image?.assets && image?.assets[0]?.uri ? 0 : 50,
          },
        ]}
        onPress={pickImage}
      >
        {image?.assets && image?.assets[0]?.uri ? (
          <Image
            style={{
              height: 250,
              width: "100%",
              borderRadius: 5,
              resizeMode: "cover",
            }}
            source={{ uri: image?.assets[0]?.uri }}
          />
        ) : (
          <Image source={require("../../assets/icons/photo.png")} />
        )}
      </TouchableOpacity>
      <Formik
        // validationSchema={LoginSchema}
        initialValues={{ caption: "", location: "" }}
        onSubmit={(values) => submitHandler(values)}
      >
        {(props) => (
          <View style={{ rowGap: 24 }}>
            <LineInput
              onChangeText={props.handleChange("caption")}
              value={props.values.caption}
              label={t("description")}
              error={props.errors.caption}
              onBlur={props.handleBlur("caption")}
              touched={props.touched.caption}
            />
            <LineInput
              onChangeText={props.handleChange("location")}
              value={props.values.location}
              label={t("location")}
              error={props.errors.location}
              onBlur={props.handleBlur("location")}
              touched={props.touched.location}
            />

            <TouchableOpacity
              style={[
                styles.mainCta,
                {
                  backgroundColor: isLoading
                    ? color.secondary3
                    : color.secondary4,
                },
              ]}
              onPress={() => props.handleSubmit()}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.mainCtaText}>{t("createPost")}</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    rowGap: 18,
  },
  imageBtn: {
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: 50,
    backgroundColor: color.primaryLight,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontFamily: "Lexend-Medium",
  },
  mainCta: {
    height: 50,
    backgroundColor: color.secondary3,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  mainCtaText: {
    fontSize: 17,
    color: color.white,
    fontFamily: "Lexend-Bold",
  },
});
