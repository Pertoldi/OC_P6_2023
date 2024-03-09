export interface IArticles {
  id: number;
  title: string;
  createdAt: Date;
  content: string;
  author: {
    name: string;
  }
  comments?: Array<any>;
}