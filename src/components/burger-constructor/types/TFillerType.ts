import {v4} from "uuid";
import {TIngredient} from "../../../types/TIngredient";

export type TFillerIngredient = TIngredient & {key: typeof v4};