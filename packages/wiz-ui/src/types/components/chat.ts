interface BaseMessage {
  message: string;
  time?: Date;
  username?: string;
}

interface MyMessage extends BaseMessage {
  sender: "me";
  read?: boolean;
}

interface OtherMessage extends BaseMessage {
  sender: "other";
}

export type Message = MyMessage | OtherMessage;
