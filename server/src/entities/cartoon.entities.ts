import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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
}