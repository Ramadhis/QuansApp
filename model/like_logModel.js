import { Sequelize } from "sequelize";
import db from ".././utils/db.js";
const { DataTypes } = Sequelize;

const Like_log = db.define(
  "like_log",
  {
    // Model attributes are defined here
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_quans: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Like_log;
