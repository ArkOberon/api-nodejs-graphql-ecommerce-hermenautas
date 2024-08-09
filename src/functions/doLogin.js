import { User } from '../models/User.js';
import cookie from 'cookie';
import { V3 } from 'paseto';
import * as dotenv from 'dotenv';
import { decodeParameters } from '../utils/ncryptSecure.js';
dotenv.config();

export const doLogin = async (email, password, sesionId, clientKey, locale, req, res) => {
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

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error(lang.default.error.noEmail);
    }

    const isValidPassword = await User.validPassword(password, user.password);

    if (!isValidPassword) {
      throw new Error(lang.default.doLogin.password);
    }

    const id = user.id;
    // eslint-disable-next-line no-undef
    const secretKey = process.env.SECRET_KEY;
    const userId = sesionId.concat(id);
    // eslint-disable-next-line no-undef
    const url = process.env.DEV_URL;

    const payload = {
      id: `${userId}`,
    };

    const token = await V3.sign(payload, secretKey, {
      audience: 'urn:hermenautas:client',
      issuer: url,
      expiresIn: '2 hours',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      SameSite: 'None',
    });

    if (req && req.headers) {
      const cookies = cookie.parse(req.headers.cookie);
      return cookies;
    }

    return {
      token,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
