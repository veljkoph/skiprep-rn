import React, {
  useState,
  useLayoutEffect,
  useCallback,
  useEffect,
} from "react";
import { View } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import renderBubble from "../../components/messages/Bubble";
import useMessages from "../../hooks/messages/useMessages";
import Loader from "../../components/global/Loader";
import useSendMessage from "../../hooks/messages/useSendMessage";

export default function Chat() {
  const { data: oldMessages, isLoading } = useMessages(1);
  const { mutate: sendMessage } = useSendMessage();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  useLayoutEffect(() => {
    if (oldMessages) {
      setMessages(oldMessages);
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
    <View style={{ flex: 1, marginBottom: insets.bottom + 50 }}>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        showUserAvatar={false}
        renderBubble={renderBubble}
        onSend={onSend}
        messagesContainerStyle={{
          backgroundColor: "#f2f2f2",
        }}
        user={{
          _id: 2,
          avatar:
            "https://kpknjige.com/wp-content/uploads/2023/05/medvedi-2.png",
        }}
      />
    </View>
  );
}
