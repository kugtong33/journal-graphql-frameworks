import { Module } from '@nestjs/common';
import { AccountResolver } from './account.resolver';

@Module({ providers: [AccountResolver] })
export class AccountModule {}
