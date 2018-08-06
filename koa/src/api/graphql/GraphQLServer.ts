import { Server } from 'net';
import * as path from 'path';
import * as Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

interface ApolloOption {
  port: number;
}

export default class {
  server?: Server;
  apollo: ApolloServer;

  constructor() {
    this.apollo = new ApolloServer({
      typeDefs: mergeTypes(fileLoader(path.join(__dirname, 'types'), { recursive: true })),
      resolvers: mergeResolvers(fileLoader(path.join(__dirname, 'resolvers'), { recursive: true })),
      playground: {
        tabs: [{ endpoint: '/graphql' }]
      }
    });
  }

  apply(app: Koa) {
    this.apollo.applyMiddleware({ app });
  }
}