export interface Iarticles {
  id: number;
  title: string;
  createdAt: Date;
  content: string;
  author: {
    name: string;
  }
}