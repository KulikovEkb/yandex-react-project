import {v4} from "uuid";
import {TIngredient} from "./TIngredient";

export type TFillerIngredient = TIngredient & {key: typeof v4};