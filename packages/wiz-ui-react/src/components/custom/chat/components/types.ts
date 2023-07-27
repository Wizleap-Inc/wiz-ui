export type Message = {
  message: string;
  sender: "me" | "other";
  time: Date;
  username?: string;
  readers?: string[];
};

export type DisplayMessage = {
  date: Date;
  contents: Message[];
};
