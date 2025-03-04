import { User } from "./user";

export interface Meme {
  id: string;
  title: string;
  imageUrl: string;
  category: Category;
  caption: string;
  likes: number;
  comments?: Comment[];
  created: string;
  user: User;
}

export interface Comment {
  user: User;
  id: string;
  text: string;
  created: string;
}

export enum Category {
  Trending = "trending",
  New = "new",
  Classic = "classic",
  Random = "random",
}
