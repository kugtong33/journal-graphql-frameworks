import * as bcrypt from 'bcrypt';
import * as Chance from 'chance';
import { Account } from '../../../src/entity/Account';

const chance: Chance.Chance = new Chance();

export default async () => {
  const password = chance.string();
  const account = new Account();

  account.username = chance.email();
  account.password = await bcrypt.hash(password, bcrypt.genSaltSync(10));
  account.firstname = chance.first();
  account.lastname = chance.last();
  account.age = 35;

  const result = await account.save();

  return {
    rawPassword: password,
    ...result,
  };
};
