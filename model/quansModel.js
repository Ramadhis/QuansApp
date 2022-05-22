import { Sequelize } from "sequelize";

// import Tag from "./tagModel.js";
import Like_log from "./like_logModel.js";
import Tag_quans from "./tag_quansModel.js";
import db from ".././utils/db.js";

const { DataTypes } = Sequelize;

const Quans = db.define(
  "quans",
  {
    // Model attributes are defined here
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_parent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quans: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
Quans.hasMany(Like_log, { foreignKey: "id_quans" });
Quans.belongsTo(Quans, { foreignKey: "id" });

Quans.hasMany(Tag_quans, { foreignKey: "id_quans" });
Quans.belongsTo(Quans, { foreignKey: "id" });

export default Quans;
