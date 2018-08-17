import { hash, genSalt, compare } from 'bcrypt';
import * as R from 'ramda';
import { Account } from '../../../../entity/Account';

interface AccountArgs {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  newPassword: string;
  oldPassword: string;
  age: number;
}

export default {
  Mutation: {
    async createAccount(obj: object, args: { input: AccountArgs }) {
      const password = await hash(args.input.password, await genSalt(10));
      const account = new Account();

      account.firstname = args.input.firstname;
      account.lastname = args.input.lastname;
      account.username = args.input.username;
      account.password = args.input.password;
      account.age = args.input.age;

      return account.save();
    },

    async updateAccount(obj: object, args: { input: AccountArgs }) {
      const account = await Account.findOne({ where: { id: args.input.id }});

      if (!account) {
        throw new Error('Account does not exist.');
      }

      await Account.update(
        { id: args.input.id },
        R.omit(['id', 'password'])(args.input),
      );

      return Account.findOne({ where: { id: args.input.id }});
    },

    async updateAccountPassword(obj, args: { input: AccountArgs }) {
      const account = await Account.findOne({ where: { id: args.input.id }});

      await compare(args.input.oldPassword, account.password);

      args.input.newPassword = await hash(args.input.newPassword, await genSalt(10));

      await Account.update(
        { id: args.input.id },
        { password: args.input.newPassword }
      );

      return true;
    },
  },
};
