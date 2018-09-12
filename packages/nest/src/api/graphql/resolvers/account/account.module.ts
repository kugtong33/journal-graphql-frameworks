import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountResolver } from './account.resolver';
import { AccountEntity } from '../../../../entity/account.entity';


@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  providers: [AccountResolver],
})
export class AccountModule {}
