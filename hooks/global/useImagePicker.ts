import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";

const useImagePicker = () => {
  const [image, setImage] = useState<ImagePicker.ImagePickerResult | null>(
    null
  );

  useEffect(() => {
    // Request permission to access the camera roll
    const requestPermission = async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission denied");
      }
    };

    requestPermission();
  }, []);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      let filename = result?.assets[0].uri.substring(
        result?.assets[0].uri.lastIndexOf("/") + 1,
        result?.assets[0].uri.length
      );
      //@ts-ignore
      delete result.cancelled;
      result = {
        ...result,
        //@ts-ignore
        name: filename,
      };
      setImage(result);
    }
  };

  return { image, pickImage };
};

export default useImagePicker;
