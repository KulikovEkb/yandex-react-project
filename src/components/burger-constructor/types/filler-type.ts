import {v4} from "uuid";
import {TIngredient} from "../../../types/ingredient";

export type TFillerIngredient = TIngredient & {key: typeof v4};