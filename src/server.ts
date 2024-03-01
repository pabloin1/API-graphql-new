import express, { Response, Request, response, request } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
//import jwt from 'jsonwebtoken';

import { ProductResolver } from "./resolves/ProductResolver";
import { UserResolver } from "./resolves/UserResolves";

const authenticate = (req: express.Request) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!);
      return payload;
    } catch (error) {
      throw new Error("Token no válido");
    }
  }
  throw new Error("Token de autenticación faltante");
};

export const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ProductResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => {
      const user = authenticate(req);
      return { req, res, user };
    },
  });

  server.applyMiddleware({ app, path: "/graphql" });

  app.use("/hola", (req = request, res = response) => {
    console.log("dasdasd");
  });

  return app;
};
