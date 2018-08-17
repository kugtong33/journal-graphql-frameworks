import Sequelize from '../lib/Sequelize';

const Account = Sequelize.define(
  'Account',
  {
    id: {
      type: Sequelize.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: Sequelize.Sequelize.STRING,
    password: Sequelize.Sequelize.STRING,
    firstname: Sequelize.Sequelize.STRING,
    lastname: Sequelize.Sequelize.STRING,
    age: Sequelize.Sequelize.INTEGER,
  },
  {
    tableName: 'Account',
    timestamps: false
  },
);

Account.removeAttribute('id');

export default Account;