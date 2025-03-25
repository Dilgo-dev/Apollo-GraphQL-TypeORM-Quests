import { DataSource } from "typeorm";
import "dotenv/config";

import { Cartoon } from "../entities/cartoon.entities";

export const dataSource = new DataSource({
  type: "sqlite", 
  database: "./db.sqlite", 
  entities: [Cartoon], 
  synchronize: true, 
});