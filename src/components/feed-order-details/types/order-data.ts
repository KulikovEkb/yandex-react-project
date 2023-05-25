import {TIngredient} from "../../../types/ingredient";

export type TOrderData = {
  number: number;
  name: string;
  status: "created" | "pending" | "done";
  createdAt: Date;
  sum: number;
  ingredients: { ingredient: TIngredient, quantity: number }[]
} | null