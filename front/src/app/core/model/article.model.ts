import { IComment } from "./comment.model";

export interface IArticle {
  id: number;
  title: string;
  createdAt: Date;
  content: string;
  author: {
    name: string;
  }
  subject: {
    name: string;
  }
  comments?: Array<IComment>;
}