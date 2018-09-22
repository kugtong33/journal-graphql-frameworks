import { Mutation, Resolver, Args, Query } from '@nestjs/graphql';
import * as R from 'ramda';
import { hash, genSalt, compare } from 'bcrypt';
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
  async createAccount(@Args() args: { input: Account }) {
    const password = await hash(
      args.input.password,
      await genSalt(10),
    );

    return this.entity.save({
      firstname: args.input.firstname,
      lastname: args.input.lastname,
      username: args.input.username,
      password,
      age: args.input.age,
    });
  }

  @Mutation('updateAccount')
  async updateAccount(@Args() args: { input: Account }) {
    const account = await this.entity.findOne({ where: { id: args.input.id }});

    if (!account) { throw new Error('Account does not exist.'); }

    await this.entity.update(
      { id: args.input.id },
      R.omit(['id', 'password'])(args.input),
    );

    return this.entity.findOne({ where: { id: args.input.id }});
  }

  @Mutation('updateAccountPassword')
  async updateAccountPassword(@Args() args: { input: Account }) {
    const account = await this.entity.findOne({ where: { id: args.input.id }});

    await compare(args.input.oldPassword, account.password);

    const newPassword = await hash(args.input.newPassword, await genSalt(10));

    await this.entity.update(
      { id: args.input.id },
      { password: newPassword }
    );

    return true;
  }
}