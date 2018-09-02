import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServer } from 'apollo-server-express';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./types/*.gql']
    }),
  ],
})
export default class {}
