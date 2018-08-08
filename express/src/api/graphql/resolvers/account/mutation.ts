import { hash, genSalt, compare } from 'bcrypt';
import * as R from 'ramda';
import Account from '../../../../entity/Account';

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

      return Account.create(args.input).then((account: { dataValues: object }) => account.dataValues);
    },

    async updateAccount(obj: object, args: { input: AccountArgs }) {
      const account = await Account.findOne({ where: { id: args.input.id }});

      if (!account) {
        throw new Error('Account does not exist.');
      }

      await Account.update(
        R.omit(['id', 'password'])(args.input),
        { where: { id: args.input.id } },
      );

      return Account.findOne({ where: { id: args.input.id }});
    },

    async updateAccountPassword(obj, args: { input: AccountArgs }) {
      const account: any = await Account.findOne({ where: { id: args.input.id }});

      await compare(args.input.oldPassword, account.dataValues.password);

      args.input.newPassword = await hash(args.input.newPassword, await genSalt(10));

      await Account.update(
        { password: args.input.newPassword },
        { where: { id: args.input.id } },
      );

      return true;
    },
  },
};
