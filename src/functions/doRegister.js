import { User } from '../models/User.js';
import { decodeParameters } from '../utils/ncryptSecure.js';
import * as dotenv from 'dotenv';
dotenv.config();

export const doRegister = async (username, email, password, clientKey, locale, res) => {
  const space = /^$|\s+/;
  const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>?~]/;

  const obj = {
    assert: {
      type: 'json',
    },
  };

  const lang = await import(`../lang/${locale}.json`, obj);

  try {
    const decode = decodeParameters(clientKey);

    // eslint-disable-next-line no-undef
    const serverKey = process.env.PUBLIC_KEY;

    if (!decode.CLIENT_KEY) {
      res.status(401).json('Unauthorized');
      /* throw new Error(lang.default.error.forbidden); */
    }

    if (serverKey !== decode.CLIENT_KEY) {
      res.status(401).json('Unauthorized');
      /* throw new Error(lang.default.error.forbidden); */
    }

    const userCheck = await User.findOne({
      where: { username: username },
    });

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

    if (password.length < 7) {
      throw new Error(lang.default.error.password);
    }

    const testSpacePass = space.test(password);

    if (testSpacePass) {
      throw new Error(lang.default.error.spacesPass);
    }

    User.create({
      username,
      email,
      password,
    });

    const data = {
      username: 'success',
      email: 'success',
    };

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
