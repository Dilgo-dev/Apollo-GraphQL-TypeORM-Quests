import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Field, InputType, ObjectType } from "type-graphql";

import { Genre, GenreInput } from "./genre.entities";
import { Personnage } from "./personnage.entities";
import { PersonnageInput } from "./personnage.entities";

@ObjectType()
@Entity()
export class Cartoon extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  nb_of_episodes: number;

  @Field()
  @Column()
  nb_of_seasons: number;

  @Field()
  @Column()
  realisator: string;

  @Field()
  @Column()
  author: string;

  @Field()
  @Column()
  ft_diffusion: string;

  @Field(() => [Genre])
  @OneToMany(() => Genre, (genre) => genre.cartoons)
  genres?: Genre[];

  @Field(() => [Personnage])
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