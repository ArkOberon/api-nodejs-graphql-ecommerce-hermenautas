/* eslint-disable no-undef */
import { User } from '../models/User.js';
import pkg from '@woocommerce/woocommerce-rest-api';
const WooCommerceRestApi = pkg.default;
import * as dotenv from 'dotenv';
dotenv.config();

export const doCreateCustomer = async (email, username) => {
  const api = new WooCommerceRestApi({
    url: process.env.URL_HOST,
    consumerKey: process.env.WOO_CONSUMER_KEY_DEV,
    consumerSecret: process.env.WOO_CONSUMER_SECRET_DEV,
    version: 'wc/v3',
  });

  const space = /^$|\s+/;
  const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>?~]/;

  const userCheck = await User.findOne({
    where: { username: username },
  });

  // CREAR UNA COMPROBACIÓN QUE PERMITA SABER SI EXISTE UN USUARIO EN
  // LA BASE DE DATOS DE WORDPRESS

  if (userCheck) {
    throw new Error(lang.default.error.user);
  }

  if (username.length < 4 || username.length > 25) {
    throw new Error(lang.default.error.minUsername);
  }

  const testChars = specialChars.test(username);

  if (testChars) {
    throw new Error(lang.default.error.alphanumeric);
  }

  const testSpaceUser = space.test(username);

  if (testSpaceUser) {
    throw new Error(lang.default.error.spaces);
  }

  const userCheckEmail = await User.findOne({
    where: { email: email },
  });

  if (userCheckEmail) {
    throw new Error(lang.default.error.email);
  }

  if (email.length < 4) {
    throw new Error(lang.default.error.invalidEmail);
  }

  const testSpaceEmail = space.test(email);

  if (testSpaceEmail) {
    throw new Error(lang.default.error.spacesEmail);
  }

  // Customer Data
  const data = {
    email: `${email}`,
    username: `${username}`,
  };

  api.post('customers', data);

  const dataReturn = {
    email: 'success',
    username: 'success',
  };

  return dataReturn;
};
