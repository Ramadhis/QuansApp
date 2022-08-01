import { Sequelize } from "sequelize";
import db from ".././utils/db.js";
import Tag_quans from "./tag_quansModel.js";
const { DataTypes } = Sequelize;

const Tag = db.define(
  "tag",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

// Tag.hasOne(Tag_quans, { foreignKey: "id_tags" });
// Tag_quans.belongsTo(Tag, { foreignKey: "id" });

export default Tag;
