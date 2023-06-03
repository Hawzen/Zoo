const Sequelize = require("sequelize");
const sequelize = require("./sequelize");

const User = sequelize.define("user", {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 20]
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 20]
        }
    },
    gender: {
        type: Sequelize.BOOLEAN, // Yup, a boolean
        allowNull: false
    }
});


module.exports = User;