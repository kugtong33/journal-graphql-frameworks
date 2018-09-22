import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './resolvers/account/account.module';
import { Connection } from 'typeorm';

@Module({ imports: [
  AccountModule,
  GraphQLModule.forRoot({ typePaths: ['./**/*.gql'] }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'ZceIdtdqt4wvjmQQvWdO',
    database: 'nest',
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    logging: false,
  })
] })
export default class {
  constructor(private readonly connection: Connection) {}
}
