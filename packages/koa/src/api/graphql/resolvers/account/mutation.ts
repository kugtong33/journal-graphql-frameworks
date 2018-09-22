import { hash, genSalt, compare } from 'bcrypt';
import * as R from 'ramda';
import Account from '../../../../interfaces/account';
import { AccountEntity } from '../../../../entity/Account';

export default {
  Mutation: {
    async createAccount(obj: object, args: { input: Account }) {
      const password = await hash(args.input.password, await genSalt(10));
      const account = new AccountEntity();

      account.firstname = args.input.firstname;
      account.lastname = args.input.lastname;
      account.username = args.input.username;
      account.password = password;
      account.age = args.input.age;

      return account.save();
    },

    async updateAccount(obj: object, args: { input: Account }) {
      const account = await AccountEntity.findOne({ where: { id: args.input.id }});

      if (!account) {
        throw new Error('AccountEntity does not exist.');
      }

      await AccountEntity.update(
        { id: args.input.id },
        R.omit(['id', 'password'])(args.input),
      );

      return AccountEntity.findOne({ where: { id: args.input.id }});
    },

    async updateAccountPassword(obj, args: { input: Account }) {
      const account = await AccountEntity.findOne({ where: { id: args.input.id }});

      await compare(args.input.oldPassword, account.password);

      const newPassword = await hash(args.input.newPassword, await genSalt(10));

      await AccountEntity.update(
        { id: args.input.id },
        { password: newPassword }
      );

      return true;
    },
  },
};
