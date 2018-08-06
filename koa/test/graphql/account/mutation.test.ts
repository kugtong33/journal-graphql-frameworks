import * as supertest from 'supertest';
import test from 'ava';
import Server from '../../../src/Server';
import randomAccount from '../../helpers/random/account';

test.before(async () => {
  const port = global.global.helper.chance.integer({ max: 9000, min: 8000 });
  const server = new Server();

  global.helper.request = supertest(await server.start({ port }));
});

test('create account', async (t) => {
  const input = {
    firstname: global.helper.chance.first(),
    lastname: global.helper.chance.last(),
    username: global.helper.chance.email(),
    password: global.helper.chance.string(),
    age: 25
  };

  const { body } = await global.helper.request
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
    firstname: global.helper.chance.first(),
    lastname: global.helper.chance.last(),
  };

  const { body } = await global.helper.request
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

  const { body } = await global.helper.request
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
