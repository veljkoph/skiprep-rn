import React, {
  useState,
  useLayoutEffect,
  useCallback,
  useEffect,
} from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { GiftedChat, IMessage, InputToolbar } from "react-native-gifted-chat";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import renderBubble from "../../components/messages/Bubble";
import useMessages from "../../hooks/messages/useMessages";
import Loader from "../../components/global/Loader";
import useSendMessage from "../../hooks/messages/useSendMessage";
import LoadEarlier from "../../components/messages/LoadEarlier";
import useKeyboardStatus from "../../hooks/layout/useKeyboardStatus";

export default function Chat() {
  const {
    data: oldMessages,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMessages(2);
  const isKeyboardOpen = useKeyboardStatus();
  console.log(isKeyboardOpen);
  const { mutate: sendMessage } = useSendMessage();
  const [messages, setMessages] = useState<IMessage[]>([]);

  const insets = useSafeAreaInsets();
  useLayoutEffect(() => {
    if (oldMessages) {
      setMessages(oldMessages?.pages?.map((page) => page?.data).flat());
    }
  }, [oldMessages]);

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    const { _id, createdAt, text, user } = newMessages[0];
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
    sendMessage({
      id: 3,
      text,
    });

    // Use the extracted message properties as needed
  }, []);

  if (isLoading) return <Loader />;

  return (
    <View
      style={{
        flex: 1,
        marginBottom: isKeyboardOpen ? 0 : insets.bottom + 50,
        paddingTop: 10,
        justifyContent: "space-between",
      }}
    >
      <GiftedChat
        messages={messages}
        isLoadingEarlier={isFetchingNextPage}
        showAvatarForEveryMessage={true}
        showUserAvatar={false}
        renderBubble={renderBubble}
        onSend={onSend}
        loadEarlier={hasNextPage}
        onLoadEarlier={() => fetchNextPage()}
        // renderLoadEarlier={(props) => hasNextPage && <LoadEarlier {...props} />}
        messagesContainerStyle={{
          backgroundColor: "#f2f2f2",
        }}
        user={{
          _id: 2,
          avatar:
            "https://kpknjige.com/wp-content/uploads/2023/05/medvedi-2.png",
        }}
      />
      {/* {Platform.OS === "ios" && <KeyboardAvoidingView behavior="padding" />} */}
    </View>
  );
}
