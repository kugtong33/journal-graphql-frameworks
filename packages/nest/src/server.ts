import { NestFactory } from '@nestjs/core';
import GraphQLApp from './api/graphql/graphql';


export default class {
  server?: any = null;

  async start({ port } = { port: 8888 }) {
    const app = await NestFactory.create(GraphQLApp);
    this.server = await app.listen(port);

    return this.server;
  }

  async stop() {
    await new Promise((resolve) => {
      this.server.close(resolve);
    });
  }
}
