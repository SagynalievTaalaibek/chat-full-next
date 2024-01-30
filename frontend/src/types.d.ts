export interface PostMessage {
  author: string;
  message: string;
}

export interface GetMessage {
  id: string;
  message: string;
  author: string;
  datetime: string;
}