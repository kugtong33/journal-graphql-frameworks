import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class accountsTable1537597085856 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.createTable(
      new Table({
        name: 'Accounts',
        columns: [
          { name: 'id', type: 'SERIAL', isPrimary: true },
          { name: 'username', type: 'VARCHAR', isUnique: true },
          { name: 'firstname', type: 'VARCHAR' },
          { name: 'lastname', type: 'VARCHAR' },
          { name: 'password', type: 'VARCHAR' },
          { name: 'age', type: 'INT' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.dropTable('Accounts');
  }
}
