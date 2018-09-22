import * as supertest from 'supertest';
import * as Chance from 'chance';
import * as chai from 'chai';
import { describe, before, after, it } from 'mocha';
import Server from '../../../src/Server';
import randomAccount from '../../helpers/random/account';


describe('Account Mutation API', () => {
  const chance: Chance.Chance = new Chance();
  const server = new Server();

  let request: supertest.SuperTest<supertest.Test> = null;

  before(async () => {
    const port = chance.integer({ max: 9000, min: 8000 });
    request = supertest(await server.start({ port }));
  });

  after(async () => { await server.stop(); });

  it('can create account', async () => {
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

    chai.assert.equal(body.data.createAccount.firstname, input.firstname);
    chai.assert.equal(body.data.createAccount.lastname, input.lastname);
    chai.assert.equal(body.data.createAccount.age, input.age);
  });

  it('can update account', async () => {
    const account: any = await randomAccount();

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

    chai.assert.equal(body.data.updateAccount.id, account.id.toString());
    chai.assert.equal(body.data.updateAccount.firstname, input.firstname);
    chai.assert.equal(body.data.updateAccount.lastname, input.lastname);
  });

  it('can update account password', async () => {
    const account: any = await randomAccount();
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

    chai.assert.equal(body.data.updateAccountPassword, true);
  });
});
