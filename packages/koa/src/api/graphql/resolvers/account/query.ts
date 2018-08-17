import { Account } from '../../../../entity/Account';

export default {
  Query: {
    account: async (obj: object, args: { id: string }) => {
      return Account.findOne({ where: { id: args.id } });
    },
  },
};