import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Cartoon } from "./cartoon.entities";
import { Field } from "type-graphql";
import { InputType } from "type-graphql";

@Entity()
export class Genre extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Cartoon, (cartoon) => cartoon.genres)
  cartoons: Cartoon;
}

@InputType()
export class GenreInput {
  @Field()
  name: string;
}
