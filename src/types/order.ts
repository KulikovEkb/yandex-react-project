export type TOrder = {
  ingredients: string[];
  _id: string;
  name: string;
  number: number;
  status: 'created' | 'pending' | 'done';
  createdAt: string;
  updatedAt: string;
}