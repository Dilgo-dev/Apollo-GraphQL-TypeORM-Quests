/** Import des librairies */
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { getOneCartoonById, getCartoons } from "./resolvers/cartoon.resolver";
import { Personnage } from "./schemas/personnage.schema";
import { Cartoon } from "./schemas/cartoon.schema";

const typeDefs = `#graphql
  # This "Cartoon" type defines the queryable fields for every cartoon in our data source.
  type Cartoon ${Cartoon}
  type Personnage ${Personnage}

  # The "Query" type is special: it lists all of the available queries
  type Query {
    getCartoons: [Cartoon],
    getOneCartoonById(id: ID!): Cartoon
  }
`;

// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      getCartoons,
      getOneCartoonById,
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
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();