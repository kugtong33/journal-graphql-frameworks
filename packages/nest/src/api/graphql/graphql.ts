import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AccountModule } from './resolvers/account/account.module';

@Module({ imports: [
  AccountModule,
  GraphQLModule.forRoot({ typePaths: ['./**/*.gql'] })
] })
export default class {}
