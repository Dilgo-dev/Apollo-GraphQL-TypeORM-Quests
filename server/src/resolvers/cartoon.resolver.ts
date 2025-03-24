import { default as cartoons } from "../../dataset.json";
import { Cartoon } from "../types/cartoon.type";

type GetOneCartoonByIdArgs = {
    id: number;
}

export const getOneCartoonById = (_: unknown, args: GetOneCartoonByIdArgs): Cartoon => {
    return cartoons.find((cartoon) => cartoon.id === +args.id) as Cartoon;
}

export const getCartoons = (): Cartoon[] => {
    return cartoons;
}

export const createCartoon = (_: unknown, args: { cartoon: Cartoon }): number => {
    const { cartoon } = args;
    const newCartoonId = cartoons[cartoons.length - 1].id + 1;

    cartoons.push({
        id: newCartoonId,
        name: cartoon.name,
        description: cartoon.description,
        nb_of_episodes: cartoon.nb_of_episodes,
        nb_of_seasons: cartoon.nb_of_seasons,
        genres: cartoon.genres,
        realisator: cartoon.realisator,
        author: cartoon.author,
        ft_diffusion: cartoon.ft_diffusion,
        personnages: cartoon.personnages.map((personnage) => ({
            ...personnage,
            id: new Date().getTime(),
        })),
    })
    return newCartoonId;
}


export const deleteCartoon = (_: unknown, args: { id: string }): boolean => {
    const { id } = args;
    const index = cartoons.findIndex((cartoon) => cartoon.id === +id);
    if (index === -1) {
        throw new Error("Cartoon not found");
    }
    cartoons.splice(index, 1);
    return true;
}
