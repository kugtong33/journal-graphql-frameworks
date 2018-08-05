/* globals helper */

import supertest from 'supertest';
import test from 'ava';
import R from 'ramda';
import Server from '../../../src/server';
import randomAccount from '../../helpers/random/account';

test.before(async () => {
  const port = helper.chance.integer({ max: 9000, min: 8000 });
  const server = new Server();

  helper.request = supertest(await server.start({ port }));
});

test('query account', async (t) => {
  const account = await randomAccount();

  const { body } = await helper.request
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
