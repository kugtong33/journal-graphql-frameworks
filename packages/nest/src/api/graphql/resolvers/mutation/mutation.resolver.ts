import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { Account } from '../../interfaces/account';

@Resolver('Mutation')
export class MutationResolver {
  @Mutation()
  async createAccount(@Args() args: Account) {}

  @Mutation()
  async updateAccount(@Args() args: Account) {}

  @Mutation()
  async updateAccountPassword(@Args() args: Account) {}
}