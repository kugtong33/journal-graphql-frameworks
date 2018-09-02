import * as supertest from 'supertest';
import * as Chance from 'chance';
import test from 'ava';
import Server from '../../../src/server';
import randomAccount from '../../helpers/random/account';

const chance: Chance.Chance = new Chance();
let request: supertest.SuperTest<supertest.Test> = null;

test.before(async (t) => {
  const port = chance.integer({ max: 9000, min: 8000 });
  const server = new Server();

  request = supertest(await server.start({ port }));
});

test('create account', async (t) => {
  const input = {
    firstname: chance.first(),
    lastname: chance.last(),
    username: chance.email(),
    password: chance.string(),
    age: 25
  };

  const { body } = await request
    .post('/graphql')
    .send({
      query: `
        mutation ($input: CreateAccountInput!) {
          createAccount(input: $input) {
            firstname
            lastname
            age
          }
        }
      `,
      variables: { input },
    })
    .expect(200);

  t.is(body.data.createAccount.firstname, input.firstname);
  t.is(body.data.createAccount.lastname, input.lastname);
  t.is(body.data.createAccount.age, input.age);
});

test('update account', async (t) => {
  const account = await randomAccount();

  const input = {
    id: account.id,
    firstname: chance.first(),
    lastname: chance.last(),
  };

  const { body } = await request
    .post('/graphql')
    .send({
      query: `
        mutation ($input: UpdateAccountInput!) {
          updateAccount(input: $input) {
            id
            firstname
            lastname
          }
        }
      `,
      variables: { input },
    })
    .expect(200);

  t.is(body.data.updateAccount.id, account.id.toString());
  t.is(body.data.updateAccount.firstname, input.firstname);
  t.is(body.data.updateAccount.lastname, input.lastname);
});

test('update account password', async (t) => {
  const account = await randomAccount();
  const input = {
    id: account.id,
    oldPassword: account.rawPassword,
    newPassword: 'password456',
  };

  const { body } = await request
    .post('/graphql')
    .send({
      query: `
        mutation ($input: UpdateAccountPasswordInput!) {
          updateAccountPassword(input: $input)
        }
      `,
      variables: { input },
    })
    .expect(200);

  t.true(body.data.updateAccountPassword);
});
