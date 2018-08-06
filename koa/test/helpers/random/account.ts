import * as bcrypt from 'bcrypt';
import { Account } from '../../../src/entity/Account';

export default async () => {
  const password = global.helper.chance.string();
  const account = new Account();

  account.username = global.helper.chance.email();
  account.password = await bcrypt.hash(password, bcrypt.genSaltSync(10));
  account.firstname = global.helper.chance.first();
  account.lastname = global.helper.chance.last();
  account.age = 35;

  const result = await account.save();

  return {
    rawPassword: password,
    ...result,
  };
};
