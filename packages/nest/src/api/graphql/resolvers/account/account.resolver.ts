import { Mutation, Resolver, Args, Query } from '@nestjs/graphql';
import { Account } from '../../interfaces/account';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from '../../../../entity/account.entity';
import { Repository } from 'typeorm';

@Resolver('Account')
export class AccountResolver {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly entity: Repository<AccountEntity>,
  ) {}

  @Query('account')
  async account(@Args('id') id: string) {
    return this.entity.findOne({ where: { id } });
  }

  @Mutation('createAccount')
  async createAccount(@Args() args: Account) {}

  @Mutation('updateAccount')
  async updateAccount(@Args() args: Account) {}

  @Mutation('updateAccountPassword')
  async updateAccountPassword(@Args() args: Account) {}
}