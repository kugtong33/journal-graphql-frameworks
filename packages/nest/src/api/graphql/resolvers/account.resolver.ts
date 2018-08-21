import { Query, Mutation, Resolver } from '@nestjs/graphql';

@Resolver('Account')
export class AccountResolvers {
  @Mutation()
  async createAccount(obj, args, ctx, info) {}

  @Mutation()
  async updateAccount(obj, args, ctx, info) {}

  @Mutation()
  async updateAccountPassword(obj, args, ctx, info) {}

  @Query()
  async account(obj, args, ctx, info) {}
}