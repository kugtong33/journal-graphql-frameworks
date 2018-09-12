import { Mutation, Resolver, Args, Query } from '@nestjs/graphql';
import { Account } from '../../interfaces/account';
import { AccountService } from './account.service';

@Resolver('Account')
export class AccountResolver {
  constructor(private readonly service: AccountService) {}

  @Query('account')
  async account(@Args('id') id: string) {}

  @Mutation('createAccount')
  async createAccount(@Args() args: Account) {}

  @Mutation('updateAccount')
  async updateAccount(@Args() args: Account) {}

  @Mutation('updateAccountPassword')
  async updateAccountPassword(@Args() args: Account) {}
}