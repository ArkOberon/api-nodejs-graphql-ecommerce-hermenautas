import { User } from '../models/User.js';
import { V3 } from 'paseto';
import { decodeParameters } from '../utils/ncryptSecure.js';
import * as dotenv from 'dotenv';
dotenv.config();

export const doDeleteToCart = async (id, productIdx, cart, clientKey, locale, req, res) => {
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

    const arrayCart = JSON.parse(cart);

    const modifyCart = arrayCart.splice(productIdx, 1);

    const newCart = JSON.stringify(modifyCart);

    User.update(
      {
        cart: newCart,
      },
      {
        where: {
          id: id,
        },
      },
    );

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
