/** Import des librairies */
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "reflect-metadata";

import CartoonResolver from "./resolvers/cartoon.resolver";
import { Personnage, PersonnageInput } from "./schemas/personnage.schema";
import { Cartoon, CartoonInput } from "./schemas/cartoon.schema";
import { dataSource } from "./database/client";

const cartoonResolver = new CartoonResolver();

const typeDefs = `#graphql
  # This "Cartoon" type defines the queryable fields for every cartoon in our data source.
  type Cartoon ${Cartoon}
  type Personnage ${Personnage}
  input PersonnageInput ${PersonnageInput}
  input CartoonInput ${CartoonInput}

  # The "Query" type is special: it lists all of the available queries
  type Query {
    getCartoons: [Cartoon],
    getOneCartoonById(id: ID!): Cartoon
  }

  type Mutation {
    createCartoon(cartoon: CartoonInput!): ID
    deleteCartoon(id: ID!): Boolean
  }
`;

// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      getCartoons: cartoonResolver.getCartoons,
      getOneCartoonById: cartoonResolver.getOneCartoonById,
    },
    Mutation: {
      createCartoon: cartoonResolver.createCartoon,
      deleteCartoon: cartoonResolver.deleteCartoon,
    },
  };

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

/** Fonction auto appellée (évite la mise en constante) permettant de lancer le serveur */
(async () => {
  await dataSource.initialize();
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();