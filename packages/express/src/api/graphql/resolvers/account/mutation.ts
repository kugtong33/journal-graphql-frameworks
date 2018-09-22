import { hash, genSalt, compare } from 'bcrypt';
import * as R from 'ramda';
import Account from '../../../../interfaces/account';
import AccountEntity from '../../../../entity/Account';

export default {
  Mutation: {
    async createAccount(obj: object, args: { input: Account }) {
      const password = await hash(args.input.password, await genSalt(10));

      return AccountEntity
        .create({ ...R.omit(['password'], args.input), password })
        .then((entity: { dataValues: Account }) => entity.dataValues);
    },

    async updateAccount(obj: object, args: { input: Account }) {
      const entity = await AccountEntity.findOne({ where: { id: args.input.id }});

      if (!entity) {
        throw new Error('AccountEntity does not exist.');
      }

      await AccountEntity.update(
        R.omit(['id', 'password'])(args.input),
        { where: { id: args.input.id } },
      );

      return AccountEntity.findOne({ where: { id: args.input.id }});
    },

    async updateAccountPassword(obj, args: { input: Account }) {
      const entity = await AccountEntity
        .findOne({ where: { id: args.input.id }})
        .then((result: { dataValues: Account }) => result.dataValues);

      await compare(args.input.oldPassword, entity.password);

      const newPassword = await hash(args.input.newPassword, await genSalt(10));

      await AccountEntity.update(
        { password: newPassword },
        { where: { id: args.input.id } },
      );

      return true;
    },
  },
};
