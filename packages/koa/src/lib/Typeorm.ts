import { createConnection } from 'typeorm';
import { Account } from '../entity/Account';

/* TODO, define interface for options */
export default class TypeORM {
  constructor() {}

  connect() {
    return createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'ZceIdtdqt4wvjmQQvWdO',
      database: 'koa',
      entities: [
        Account,
      ],
      synchronize: true,
      logging: false,
    });
  }
}
