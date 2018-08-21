import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';
import { ApolloServer } from 'apollo-server-express';

@Module({ imports: [GraphQLModule] })
export default class implements NestModule {
  constructor(private readonly factory: GraphQLFactory) {}

  configure(consumer: MiddlewareConsumer) {
    const types = this.factory.mergeTypesByPaths('./types/*.gql');
    const schema = this.factory.createSchema({ typeDefs: types });

    const apollo = new ApolloServer({});

    consumer
      .apply()
      .forRoutes('/graphql');
  }
}
