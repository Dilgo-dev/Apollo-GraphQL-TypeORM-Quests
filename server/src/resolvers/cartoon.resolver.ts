import { Cartoon, CartoonInput } from "../entities/cartoon.entities";
import { Genre } from "../entities/genre.entities";
import { Personnage } from "../entities/personnage.entities";
import { Resolver, Query, Mutation, Int, Arg } from "type-graphql";

@Resolver(Cartoon)
export default class CartoonResolver {

    @Query(() => Cartoon)
    public async getOneCartoonById(@Arg("id") id: number): Promise<Cartoon> {
        const cartoon = await Cartoon.findOne({ where: { id: Number(id) } });
        if (!cartoon) {
            throw new Error("Cartoon not found");
        }
        return cartoon;
    }

    @Query(() => [Cartoon])
    public async getCartoons(): Promise<Cartoon[]> {
        return await Cartoon.find();
    }

    @Mutation(() => Int)
    public async createCartoon(@Arg("cartoon") cartoon: CartoonInput): Promise<number> {
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

    @Mutation(() => Boolean)
    public async deleteCartoon(@Arg("id") id: number): Promise<boolean> {
        const cartoon = await Cartoon.findOne({ where: { id: Number(id) } });
        if (!cartoon) {
            throw new Error("Cartoon not found");
        }
        await cartoon.remove();
        return true;
    }
}
