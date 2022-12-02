export interface Message {
  message: string;
  sender: "me" | "other";
  time: Date;
  username?: string;
  read?: boolean;
}

export interface DisplayMessage {
  date: Date;
  contents: Message[];
}
