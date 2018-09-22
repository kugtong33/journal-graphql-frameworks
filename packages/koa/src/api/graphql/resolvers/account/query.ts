import { AccountEntity } from '../../../../entity/Account';

export default {
  Query: {
    account: async (obj: object, args: { id: string }) => {
      return AccountEntity.findOne({ where: { id: args.id } });
    },
  },
};