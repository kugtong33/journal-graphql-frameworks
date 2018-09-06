import { Module } from '@nestjs/common';
import { MutationResolver } from './mutation.resolver';

@Module({ providers: [MutationResolver] })
export class MutationModule {}
