import * as bcrypt from 'bcrypt';
import * as Chance from 'chance';
import Account from '../../../src/entity/Account';

const chance: Chance.Chance = new Chance();

export default async () => {
  const password: string = 'password';
  const account: any = {};

  account.username = chance.email();
  account.password = await bcrypt.hash(password, bcrypt.genSaltSync(10));
  account.firstname = chance.first();
  account.lastname = chance.last();
  account.age = 35;

  const result = await Account.create(account)
    .then((account: { dataValues: object }) => account.dataValues);

  console.log(result);

  return {
    rawPassword: password,
    ...result,
  };
};
