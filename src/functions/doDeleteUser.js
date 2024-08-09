import { User } from '../models/User.js';
import { V3 } from 'paseto';
import * as dotenv from 'dotenv';
dotenv.config();

export const doDeleteUser = async (id) => {
  const user = await User.findOne({ where: { id } });

  await user.destroy({ force: true });

  // eslint-disable-next-line no-undef
  const secretKey = process.env.SECRET_KEY;
  // eslint-disable-next-line no-undef
  const url = process.env.DEV_URL;

  const payload = {
    delete: 'success',
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
};
