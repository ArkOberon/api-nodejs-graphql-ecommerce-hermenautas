import { User } from '../models/User.js';
import { V3 } from 'paseto';
import { decodeParameters } from '../utils/ncryptSecure.js';
import * as dotenv from 'dotenv';
dotenv.config();

export const doUpdateUser = async (id, username, email, clientKey, locale, req, res) => {
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

    if (username.length > 0) {
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

      const testSpace = space.test(username);

      if (testSpace) {
        throw new Error(lang.default.error.spaces);
      }

      User.update(
        {
          username: username,
        },
        {
          where: {
            id: id,
          },
        },
      );
    }

    if (email.length > 0) {
      const userCheck = await User.findOne({
        where: { email: email },
      });

      if (userCheck) {
        throw new Error(lang.default.error.email);
      }

      if (email.length < 4) {
        throw new Error(lang.default.error.invalidEmail);
      }

      const testSpace = space.test(email);
      if (testSpace) {
        throw new Error(lang.default.error.spacesEmail);
      }

      User.update(
        {
          email: email,
        },
        {
          where: {
            id: id,
          },
        },
      );
    }

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
