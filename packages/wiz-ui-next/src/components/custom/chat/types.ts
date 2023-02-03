export interface Message {
  message: string;
  sender: "me" | "other";
  time: Date;
  username?: string;
  readers?: string[];
}

export interface DisplayMessage {
  date: Date;
  contents: Message[];
}
