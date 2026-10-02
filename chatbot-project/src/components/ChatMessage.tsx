import dayjs from "dayjs";

import RobotProfileImage from "../assets/robot.png";
import UserProfileImage from "../assets/profile-1.jpg";

import "./ChatMessage.css";

type ChatMessageProps = {
  message: string;
  sender: string;
};

export default function ChatMessage({ message, sender }: ChatMessageProps) {
  // Im not confident to this time displaying.
  // It display the time immediately after sending an input for chatbot response.
  // I think the time should be displayed after the chatbot response is sent.
  const time = dayjs().valueOf();
  const formattedTime = dayjs(time).format("h:mma");

  // console.log(UserProfileImage);
  return (
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {sender === "robot" && (
        <img src={RobotProfileImage} className="chat-message-profile" />
      )}
      <div className="chat-message-text">
        <span>{message}</span>
        <p className="chat-message-time">{formattedTime}</p>
      </div>
      {sender === "user" && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )}
    </div>
  );
}
