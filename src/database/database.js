/* eslint-disable no-undef */
import Sequelize from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();

/* const dialect = config.development.dialect; */
const dialect = `${process.env.DIALECT_POSTGRESQL}`;

export const sequelize = new Sequelize(
  `${process.env.DATABASE_POSTGRESQL}`,
  `${process.env.USERNAME_POSTGRESQL}`,
  `${process.env.PASSWORD_POSTGRESQL}`,

  {
    dialect,
    define: {
      underscored: true,
    },
  },
);
