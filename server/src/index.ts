/** Import des librairies */
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import "reflect-metadata";

import CartoonResolver from "./resolvers/cartoon.resolver";
import { dataSource } from "./database/client";


/** Fonction auto appellée (évite la mise en constante) permettant de lancer le serveur */
(async () => {
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [CartoonResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();