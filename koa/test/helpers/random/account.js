/* globals helper */

import bcrypt from 'bcrypt';
import { Account } from '../../../src/entity/Account';

export default async () => {
  const password = helper.chance.string();
  const account = new Account();

  account.username = helper.chance.email();
  account.password = await bcrypt.hash(password, bcrypt.genSaltSync(10));
  account.firstname = helper.chance.first();
  account.lastname = helper.chance.last();
  account.age = 35;

  const result = await account.save();

  return {
    rawPassword: password,
    ...result,
  };
};
