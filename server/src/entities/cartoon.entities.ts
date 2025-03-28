import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Field, InputType } from "type-graphql";
import { Genre, GenreInput } from "./genre.entities";
import { Personnage } from "./personnage.entities";
import { PersonnageInput } from "./personnage.entities";
@Entity()
export class Cartoon extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  nb_of_episodes: number;

  @Column()
  nb_of_seasons: number;

  @Column()
  realisator: string;

  @Column()
  author: string;

  @Column()
  ft_diffusion: string;

  @OneToMany(() => Genre, (genre) => genre.cartoons)
  genres?: Genre[];

  @OneToMany(() => Personnage, (personnage) => personnage.cartoon)
  personnages?: Personnage[];
}

@InputType()
export class CartoonInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  nb_of_episodes: number;

  @Field()
  nb_of_seasons: number;

  @Field(() => [GenreInput])
  genres: GenreInput[];

  @Field()
  realisator: string;

  @Field()
  author: string;

  @Field()
  ft_diffusion: string;

  @Field(() => [PersonnageInput])
  personnages: [PersonnageInput];
}