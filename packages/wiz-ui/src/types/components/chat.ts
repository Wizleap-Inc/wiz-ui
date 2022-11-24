interface BaseMessage {
  message: string;
  time?: string;
}

interface MyMessage extends BaseMessage {
  sender: "me";
  read?: boolean;
}

interface OtherMessage extends BaseMessage {
  sender: "other";
  username: string;
}

export type Message = MyMessage | OtherMessage;
