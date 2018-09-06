import { Module } from '@nestjs/common';
import { QueryResolver } from './query.resolver';

@Module({ providers: [QueryResolver] })
export class QueryModule {}
