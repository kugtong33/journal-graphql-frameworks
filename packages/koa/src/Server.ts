import { Server } from 'net';
import { Connection } from 'typeorm';
import * as Koa from 'koa';
import * as bodyparser from 'koa-bodyparser';
import * as cachecontrol from 'koa-cache-control';
import GraphQLServer from './api/graphql/GraphQLServer';
import Typeorm from './lib/Typeorm';

interface ServerOption {
  port: number;
}

export default class {
  graphql: GraphQLServer;
  server?: Server;
  koa: Koa;
  typeorm: Typeorm;
  connection: Connection;

  constructor() {
    this.koa = new Koa();
    this.graphql = new GraphQLServer();
    this.typeorm = new Typeorm();
    this.server = undefined;
  }

  async start(opts: ServerOption = { port: 8888 }) {
    /* load Typeorm first */
    this.connection = await this.typeorm.connect();

    this.koa.use(bodyparser());
    this.koa.use(cachecontrol({ noCache: true }));

    this.graphql.apply(this.koa);

    this.server = this.koa.listen(opts.port);

    return this.server;
  }

  async stop() {
    await this.connection.close();

    await new Promise((resolve) => {
      this.server && this.server.close(resolve);
    });
  }
}
