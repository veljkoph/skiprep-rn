import { Bubble } from "react-native-gifted-chat";

const renderBubble = (props: any) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#007AFF", // Set the desired background color for your outgoing messages
        },
        left: {
          backgroundColor: "#fff", // Set the desired background color for incoming messages
        },
      }}
    />
  );
};
export default renderBubble;
