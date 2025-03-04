import { User } from "./user";

export interface Meme {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  caption: string;
  likes: number;
  comments: Comment[];
  created: string;
  user: User;
}

export interface Comment {
  user: User;
  id: string;
  text: string;
  created: string;
}

export type Category = "trending" | "new" | "classic" | "random";
