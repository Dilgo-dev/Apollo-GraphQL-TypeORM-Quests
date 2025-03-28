import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Cartoon } from "./cartoon.entities";
import { InputType, Field } from "type-graphql";

@Entity()
export class Personnage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  role: string;

  @Column()
  short_description: string;

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
