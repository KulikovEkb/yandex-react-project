import {TIngredientCategories} from "../types/ingredient-categories";
import {RefObject} from "react";

export type TIngredientTabsRef = {
  [category in TIngredientCategories]: {
    scrollRef: (node?: Element | null) => void;
    clickRef: RefObject<HTMLDivElement>
  }
};
