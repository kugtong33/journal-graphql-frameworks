export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable(
    'Accounts',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING,
        unique: "UniqueAccounts",
        allowNull: false,
      },
      password: Sequelize.STRING,
      firstname: Sequelize.STRING,
      lastname: Sequelize.STRING,
      age: Sequelize.INTEGER,
    }
  );
}

export async function down(queryInterface) {
  await queryInterface.dropTable('Accounts');
}
