import * as supertest from 'supertest';
import * as Chance from 'chance';
import * as assert from 'assert';
import { describe, before, after, it } from 'mocha';
import * as R from 'ramda';
import Server from '../../../src/Server';
import randomAccount from '../../helpers/random/account';


describe('Account Query API', () => {
  const server = new Server();
  const chance: Chance.Chance = new Chance();

  let request: supertest.SuperTest<supertest.Test> = null;

  before(async () => {
    const port = chance.integer({ max: 9000, min: 8000 });
    request = supertest(await server.start({ port }));
  });

  after(async () => { await server.stop(); });

  it('can query account', async () => {
    const account: any = await randomAccount();

    const { body } = await request
      .post('/graphql')
      .send({
        query: `
          query ($id: String!) {
            account(id: $id) { id firstname lastname username age }
          }
        `,
        variables: { id: account.id },
      })
      .expect(200);

    assert.deepStrictEqual(body.data.account.id, account.id.toString());
    assert.deepStrictEqual(R.omit(['id'])(body.data.account), R.omit(['id', 'password', 'rawPassword'])(account));
  });
});
