export interface Message {
  message: string;
  sender: "me" | "other";
  username?: string;
  time?: Date;
  read?: boolean;
}
