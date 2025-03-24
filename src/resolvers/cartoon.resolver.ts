import { default as cartoons } from "../../dataset.json";
import { Cartoon } from "../types/cartoon.type";

export const getOneCartoonById = (): Cartoon => {
    return cartoons[0]
}