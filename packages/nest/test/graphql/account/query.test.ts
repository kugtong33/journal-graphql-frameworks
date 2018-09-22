import * as supertest from 'supertest';
import * as Chance from 'chance';
import test from 'ava';
import * as R from 'ramda';
import Server from '../../../src/server';
import randomAccount from '../../helpers/random/account';

const chance: Chance.Chance = new Chance();
const server = new Server();

let request: supertest.SuperTest<supertest.Test> = null;

test.before(async () => {
  const port = chance.integer({ max: 9000, min: 8000 });

  request = supertest(await server.start({ port }));
});

test.after(async () => { await server.stop(); });

test('query account', async (t) => {
  const account = await randomAccount();

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

  t.deepEqual(body.data.account.id, account.id.toString());
  t.deepEqual(R.omit(['id'])(body.data.account), R.omit(['id', 'password', 'rawPassword'])(account));
});
