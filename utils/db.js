import { Sequelize } from "sequelize";

const db = new Sequelize("db_tanyajawab", "root", "", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

export default db;
