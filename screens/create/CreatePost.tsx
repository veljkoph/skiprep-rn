import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Toast } from "react-native-toast-message/lib/src/Toast";

interface IForm {
  caption?: string;
  location?: string;
}
const CreatePost = () => {
  const { pickImage, image } = useImagePicker();
  const { t } = useTranslation();
  const { mutate: createPost, isLoading } = useCreatePost();
  const { bottom: bottomInsets } = useSafeAreaInsets();
  const submitHandler = (values: IForm) => {
    const formData = new FormData();

    if (!image?.assets) {
      Toast.show({
        type: "error",
        text1: t("imageRequired") || "",
      });
    }
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
    <ScrollView>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        keyboardOpeningTime={10}
      >
        {/* <Text style={styles.title}>{t("createPost")}</Text> */}

        <TouchableOpacity
          style={[
            styles.imageBtn,
            {
              paddingVertical: image?.assets && image?.assets[0]?.uri ? 0 : 50,
              borderWidth: image?.assets && image?.assets[0]?.uri ? 0 : 2,
            },
          ]}
          onPress={pickImage}
        >
          {image?.assets && image?.assets[0]?.uri ? (
            <Image
              style={{
                height: 250,
                aspectRatio: 1,
                borderRadius: 5,
                resizeMode: "cover",
              }}
              source={{ uri: image?.assets[0]?.uri }}
            />
          ) : (
            <Image
              style={{
                height: 64,
                borderRadius: 5,
                resizeMode: "contain",
              }}
              source={require("../../assets/icons/photo.png")}
            />
          )}
        </TouchableOpacity>
        <Formik
          // validationSchema={LoginSchema}
          initialValues={{ caption: "", location: "" }}
          onSubmit={(values) => submitHandler(values)}
        >
          {(props) => (
            <View
              style={{
                justifyContent: "space-between",
                flex: 1,
                paddingBottom: bottomInsets + 60,
              }}
            >
              <View style={{ rowGap: 12, flex: 1 }}>
                <View style={{ rowGap: 8 }}>
                  <Text style={styles.label}>{t("caption")}</Text>
                  <TextInput
                    onChangeText={props.handleChange("caption")}
                    value={props.values.caption}
                    placeholder={t("addCaption") || ""}
                    multiline
                    style={[styles.descriptionInput, styles.shadow]}
                  />
                </View>
                <View style={{ rowGap: 8 }}>
                  <Text style={styles.label}>{t("location")}</Text>
                  <TextInput
                    onChangeText={props.handleChange("location")}
                    value={props.values.location}
                    placeholder={t("location") || ""}
                    style={[styles.locInput, styles.shadow]}
                  />
                </View>
              </View>
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
                <LinearGradient
                  // Button Linear Gradient
                  colors={["#1ea281", "#188368"]}
                  style={{
                    width: "100%",
                    flex: 1,
                    borderRadius: 3,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.mainCtaText}>{t("createPost")}</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    rowGap: 24,
    flex: 1,
  },
  imageBtn: {
    borderRadius: 1,
    width: "100%",
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: color.secondary3,
    alignItems: "center",
    backgroundColor: "#FFf",
  },
  title: {
    fontSize: 24,
    fontFamily: "Lexend-Medium",
  },
  mainCta: {
    height: 50,
    backgroundColor: color.secondary3,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  mainCtaText: {
    fontSize: 16,
    color: color.white,
    fontFamily: "Lexend-Medium",
  },
  label: {
    fontSize: 14,
    color: color.black,
    fontFamily: "Lexend-Medium",
  },
  descriptionInput: {
    backgroundColor: "white",
    borderRadius: 3,
    minHeight: 100,
    padding: 5,
    fontFamily: "Lexend-Regular",
  },
  locInput: {
    backgroundColor: "white",
    borderRadius: 3,
    minHeight: 50,
    padding: 5,
    fontFamily: "Lexend-Regular",
  },
  shadow: {
    shadowColor: "#8a8a8a",

    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 1.41,
    elevation: 1,
  },
});
