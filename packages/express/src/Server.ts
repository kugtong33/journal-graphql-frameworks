import { Server } from 'net';
import * as core from "express-serve-static-core";
import * as express from 'express';
import * as bodyparser from 'body-parser';
import * as cors from 'cors';

interface ServerOption {
  port: number;
}

export default class {
  server?: Server;
  express: core.Express;

  constructor() {
    this.express = express();
  }

  async start (opts: ServerOption = { port: 8888 }) {
    this.express.use(bodyparser());
    this.express.use(cors());

    this.server = this.express.listen(opts.port);

    return this.server;
  }

  async stop() {
    await new Promise((resolve) => {
      this.server && this.server.close(resolve);
    });
  }
}