import { Sequelize } from "sequelize";
import db from ".././utils/db.js";
const { DataTypes } = Sequelize;

const Tag = db.define(
  "tag",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Tag;
