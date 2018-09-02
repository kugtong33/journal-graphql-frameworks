import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Unique(['username'])
@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  password: string;

  @Column()
  age: number;
}
