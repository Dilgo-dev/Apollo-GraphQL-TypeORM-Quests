import { DataSource } from "typeorm";
import "dotenv/config";

import { Cartoon } from "../entities/cartoon.entities";
import { Genre } from "../entities/genre.entities";
import { Personnage } from "../entities/personnage.entities";

export const dataSource = new DataSource({
  type: "sqlite", 
  database: "./db.sqlite", 
  entities: [Cartoon, Genre, Personnage], 
  synchronize: true, 
});