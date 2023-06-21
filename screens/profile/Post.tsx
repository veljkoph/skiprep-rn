import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BASE } from "@env";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { color } from "../../variables/color";
import Ionicons from "react-native-vector-icons/Ionicons";
import ImageBlurLoading from "react-native-image-blur-loading";
import Loader from "../../components/global/Loader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet from "@gorhom/bottom-sheet";
import PostInfoSheet from "../../components/profile/PostInfoSheet";

export interface IPost {
  caption?: string;
  created_at?: Date;
  id: number;
  image?: string;
  updated_at?: Date;
  user_id?: number;
  location?: string;
  user?: string;
}

dayjs.extend(relativeTime);

const Post = (props: { route: { params: IPost } }) => {
  const { caption, created_at, image, location, user, id } =
    props?.route?.params;

  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [aspectRatio, setAspectRatio] = useState(0);

  useEffect(() => {
    // Load the remote image and get its size
    loadImageSize(`${BASE}${image}`);
    if (imageSize.height && imageSize.width) {
      setAspectRatio(imageSize.width / imageSize.height);
    }
  }, [imageSize.height]);

  const loadImageSize = useCallback((imageUrl: string) => {
    if (!imageUrl) {
      return;
    }
    Image?.getSize(
      imageUrl,
      (width, height) => {
        setImageSize({ width, height });
      },
      (error) => {
        console.error("Failed to load image size:", error);
      }
    );
  }, []);

  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["50%"], []);
  const [isOpen, setIsOpen] = useState(true);
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleSnapPress = useCallback(() => {
    bottomSheetRef?.current?.expand();
    console.log("open");
    setIsOpen(true);
  }, []);

  if (!imageSize.height) return <Loader loaderColor={color.secondary3} />;
  return (
    <View style={[styles.container]}>
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
            <Text style={styles.userName}>{user}</Text>
            {location && (
              <Text style={styles.location}>
                <Ionicons
                  color={color.secondary3}
                  name="location-outline"
                  size={18}
                />
                {location}
              </Text>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => handleSnapPress()}
        >
          <Image
            style={{ height: 30, width: 30 }}
            source={require("../../assets/icons/threedots.png")}
          />
        </TouchableOpacity>
      </View>

      {aspectRatio !== 0 && (
        <ImageBlurLoading
          //  thumbnailSource={require("../../assets/icons/add.png")}
          source={{ uri: `${BASE}${image}` }}
          style={[styles.image, { aspectRatio: aspectRatio }]}
        />
      )}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
        style={{
          borderWidth: 2,
          borderRadius: 15,
          borderColor: color.secondary,
        }}
      >
        <PostInfoSheet
          time={dayjs(created_at)?.fromNow()}
          caption={caption}
          id={id}
        />
      </BottomSheet>
      {caption && (
        <Text style={styles.desc}>
          <Text style={styles.bold}> @korisnik &nbsp;</Text>
          {caption}
        </Text>
      )}
      <Text style={styles.time}>{dayjs(created_at)?.fromNow()}</Text>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
    backgroundColor: "#FFF",
    flex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "contain",
  },
  profileImg: {
    borderRadius: 50,
    height: 40,
    aspectRatio: 1,
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
    padding: 5,
  },
  desc: {
    color: color.black,
    fontSize: 14,
    fontFamily: "Lexend-Light",
    padding: 5,
  },
  bold: {
    color: color.black,
    fontSize: 14,
    fontFamily: "Lexend-Bold",
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
