import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({ imports: [GraphQLModule.forRoot({ typePaths: ['./types/*.gql'] })] })
export default class {}
