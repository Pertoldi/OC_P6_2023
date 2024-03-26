export interface IArticles {
  id: number;
  title: string;
  createdAt: Date;
  content: string;
  author: {
    name: string;
  }
  // comments?: Array<{ id: number; content: string; createdAt: Date; author: { name: string } }>;
  comments?: any;
}