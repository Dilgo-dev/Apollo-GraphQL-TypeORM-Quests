import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Cartoon } from "./cartoon.entities";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Genre extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Cartoon)
  @ManyToOne(() => Cartoon, (cartoon) => cartoon.genres)
  cartoons: Cartoon;
}

@InputType()
export class GenreInput {
  @Field()
  name: string;
}
