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
  { timestamps: false },
);

Account.sync({ force: false });

export default Account;