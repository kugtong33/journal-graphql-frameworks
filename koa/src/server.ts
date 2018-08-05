import { Server } from 'net';
import * as Koa from 'koa';
import * as bodyparser from 'koa-bodyparser';
import * as cachecontrol from 'koa-cache-control';
import GraphQL from './api/graphql/server';
import TypeORM from './lib/typeorm';

interface ServerOption {
  port: number
}

export default class {
  graphql: GraphQL;
  server?: Server;
  koa: Koa;
  typeorm: TypeORM;

  constructor() {
    this.koa = new Koa();
    this.graphql = new GraphQL();
    this.typeorm = new TypeORM();
    this.server = undefined;
  }

  async start(opts: ServerOption = { port: 8888 }) {
    /* load typeorm first */
    await this.typeorm.connect();

    this.koa.use(bodyparser());
    this.koa.use(cachecontrol({ noCache: true }));

    this.graphql.apply(this.koa);

    this.server = this.koa.listen(opts.port);

    return this.server;
  }

  async stop() {
    await new Promise((resolve) => {
      this.server && this.server.close(resolve);
    });
  }
}