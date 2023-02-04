const sanitize = (str: string) => {
  let sanitized = str;
  sanitized = sanitized.replace(/&/g, "&amp;");
  sanitized = sanitized.replace(/</g, "&lt;");
  sanitized = sanitized.replace(/>/g, "&gt;");
  return sanitized;
};

const URL_REGEX = /(https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+)/g;

type LinkifyToken = {
  type: "text" | "link";
  content: string;
};

export const linkify = (text: string): LinkifyToken[] => {
  const sanitized = sanitize(text);
  const tokens = sanitized.split(URL_REGEX);
  return tokens
    .map((token) => {
      if (token === "") return null;
      return {
        type: token.match(URL_REGEX) ? "link" : "text",
        content: token,
      };
    })
    .filter((token): token is LinkifyToken => token !== null);
};
