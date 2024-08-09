import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import bcrypt from 'bcrypt';

export const User = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    cit: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
      defaultValue: null,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 25],
        not: /^$|\s+/,
        isAlphanumeric: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [7, 9999],
        not: /^$|\s+/,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    privilege: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'particular',
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cart: {
      type: DataTypes.TEXT,
      defaultValue: '',
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10, 'a');
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
    },
    instanceMethods: {
      validPassword: (password) => {
        return bcrypt.compareSync(password, this.password);
      },
    },
  },
);

User.validPassword = async (password, hash) => {
  return await bcrypt.compareSync(password, hash);
};
