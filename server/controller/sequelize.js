const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cashier_app_minpro', 'root', 'mysql00!', {
    host: '2000',
    dialect: 'mysql', // or any other supported dialect
    // other options
});

// Test the connection
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = sequelize; // Export the initialized Sequelize instance