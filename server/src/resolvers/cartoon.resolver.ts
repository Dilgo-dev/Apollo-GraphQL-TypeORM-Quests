import { Cartoon } from "../entities/cartoon.entities";
import { Genre } from "../entities/genre.entities";
import { Personnage } from "../entities/personnage.entities";

type GetOneCartoonByIdArgs = {
    id: number;
}

export const getOneCartoonById = async (_: unknown, args: GetOneCartoonByIdArgs): Promise<Cartoon> => {
    const cartoon = await Cartoon.findOne({ where: { id: args.id } });
    if (!cartoon) {
        throw new Error("Cartoon not found");
    }
    return cartoon;
}

export const getCartoons = async (): Promise<Cartoon[]> => await Cartoon.find();

export const createCartoon = async (_: unknown, args: { cartoon: Cartoon }): Promise<number> => {
    const { cartoon } = args;

    const newPersonnages = cartoon.personnages?.map((personnage) => {
        const newPersonnage = new Personnage();
        newPersonnage.name = personnage.name;
        newPersonnage.role = personnage.role;
        newPersonnage.short_description = personnage.short_description;
        return newPersonnage;
    }) as Personnage[];

    const newGenres = cartoon.genres?.map((genre) => {
        const newGenre = new Genre();
        newGenre.name = genre.name;
        return newGenre;
    }) as Genre[];

    const newCartoon = new Cartoon();
    Object.assign(newCartoon, cartoon);
    newCartoon.personnages = newPersonnages;
    newCartoon.genres = newGenres;

    const { id } = await newCartoon.save();
    return id;
}


export const deleteCartoon = async (_: unknown, args: { id: string }): Promise<boolean> => {
    const { id } = args;
    const cartoon = await Cartoon.findOne({ where: { id: +id } });
    if (!cartoon) {
        throw new Error("Cartoon not found");
    }
    await cartoon.remove();
    return true;
}
