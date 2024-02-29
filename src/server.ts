import express, {Response , Request, response, request} from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { ProductResolver } from "./resolves/ProductResolver";
import { UserResolver } from "./resolves/UserResolves";

export const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ProductResolver, UserResolver],
      validate: false,
      
    }),
    context: ({ req , res }) => ({ req, res }),
  });

  server.applyMiddleware({ app, path: "/graphql" });

  app.use('/hola', (req = request, res = response)=>{
    console.log('dasdasd');
  })

  return app;
};
