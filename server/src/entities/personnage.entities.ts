import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Cartoon } from "./cartoon.entities";
import { InputType, Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Personnage extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  role: string;

  @Field()
  @Column()
  short_description: string;

  @Field(() => Cartoon)
  @ManyToOne(() => Cartoon, (cartoon) => cartoon.personnages)
  cartoon: Cartoon;
}

@InputType()
export class PersonnageInput {
  @Field()
  name: string;

  @Field()
  role: string;

  @Field()
  short_description: string;
}
