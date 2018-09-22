import { Server } from 'net';
import * as core from 'express-serve-static-core';
import * as express from 'express';
import * as bodyparser from 'body-parser';
import * as cors from 'cors';
import GraphQLServer from './api/graphql/GraphQLServer';

export default class {
  graphql: GraphQLServer;
  server?: Server;
  express: core.Express;

  constructor() {
    this.express = express();
    this.graphql = new GraphQLServer();
  }

  async start (opts: { port: number } = { port: 8888 }) {
    this.express.use(bodyparser());
    this.express.use(cors());

    this.graphql.apply(this.express);

    this.server = this.express.listen(opts.port);

    return this.server;
  }

  async stop() {
    await new Promise((resolve) => {
      this.server && this.server.close(resolve);
    });
  }
}
