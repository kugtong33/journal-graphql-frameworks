import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { Account } from '../../interfaces/account';

@Resolver('Account')
export class AccountResolver {
  @Mutation()
  async createAccount(@Args() args: Account) {}

  @Mutation()
  async updateAccount(@Args() args: Account) {}

  @Mutation()
  async updateAccountPassword(@Args() args: Account) {}

  @Query()
  async account(@Args('id') id: string) {}
}