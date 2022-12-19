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
    job: {
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
    },
    image_profile: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Users;
