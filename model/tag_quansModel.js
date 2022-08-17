import { Sequelize } from "sequelize";
import db from ".././utils/db.js";
import Tag from "./tagModel.js";
const { DataTypes } = Sequelize;

const Tag_quans = db.define(
  "tag_quans",
  {
    // Model attributes are defined here
    id_tags: {
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

Tag.hasOne(Tag_quans, { foreignKey: "id_tags" });
Tag_quans.belongsTo(Tag, { foreignKey: "id_tags" });
export default Tag_quans;
