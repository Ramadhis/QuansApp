import { Sequelize } from "sequelize";
import db from ".././utils/db.js";
const { DataTypes } = Sequelize;

const Users = db.define(
  "user",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    refreshtoken: {
      type: DataTypes.TEXT,
      // allowNull defaults to true
    },
  },
  {
    freezeTableName: true,
  }
);

export default Users;
