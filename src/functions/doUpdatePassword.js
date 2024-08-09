import { User } from '../models/User.js';
import { V3 } from 'paseto';
import { decodeParameters } from '../utils/ncryptSecure.js';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();

export const doUpdatePassword = async (id, oldPassword, password, clientKey, locale, req, res) => {
  const space = /^$|\s+/;

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
      throw new Error(lang.default.error.forbidden);
    }

    if (serverKey !== decode.CLIENT_KEY) {
      res.status(401).json('Unauthorized');
      throw new Error(lang.default.error.forbidden);
    }

    const user = await User.findOne({ where: { id: id } });

    if (!user) {
      throw new Error(lang.default.error.noUser);
    }

    const isValidPassword = await User.validPassword(oldPassword, user.password);

    if (!isValidPassword) {
      throw new Error(lang.default.doUpdatePassword.noMatch);
    }

    if (password.length < 7) {
      throw new Error(lang.default.error.password);
    }

    const testSpacePass = space.test(password);

    if (testSpacePass) {
      throw new Error(lang.default.error.spacePass);
    }

    const salt = bcrypt.genSaltSync(10, 'a');
    const newPassword = bcrypt.hashSync(password, salt);

    User.update({ password: newPassword }, { where: { id: id } });

    // eslint-disable-next-line no-undef
    const secretKey = process.env.SECRET_KEY;
    // eslint-disable-next-line no-undef
    const url = process.env.DEV_URL;

    const payload = {
      success: 'success',
    };

    const token = await V3.sign(payload, secretKey, {
      audience: 'urn:hermenautas:client',
      issuer: url,
      expiresIn: '2 hours',
    });

    const data = {
      token,
    };

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
