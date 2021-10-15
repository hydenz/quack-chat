export interface MessageData {
  id: string;
  content: string;
  timestampClientReceived?: number;
  timestampServerReceived?: number;
}

export interface Message {
  from: string;
  to: string;
  data: MessageData[];
}

export interface User {
  username: string;
  password: string;
  nickname: string;
  status: string;
  pictureHash?: string;
}
