interface BaseMessage {
  message: string;
}

interface MyMessage extends BaseMessage {
  sender: "me";
}

interface OtherMessage extends BaseMessage {
  sender: "other";
  username: string;
}

export type Message = MyMessage | OtherMessage;
