export interface IComment {
  id: number;
  content: string;
  createdAt: Date;
  author: {
    name: string
  }
}
