import { User } from '../../models/User.js';
import { doLogin } from '../../functions/doLogin.js';
import { doRegister } from '../../functions/doRegister.js';
import { doCreateCustomer } from '../../functions/doCreateCustomer.js';
import { doSyncroCitCustomer } from '../../functions/doSyncroCitCustomer.js';
import { doSendEmail } from '../../functions/doSendEmail.js';
import { doRecover } from '../../functions/doRecover.js';
import { doUpdatePassword } from '../../functions/doUpdatePassword.js';
import { doUpdateUser } from '../../functions/doUpdateUser.js';
import { doDeleteUser } from '../../functions/doDeleteUser.js';
import { doAddToCart } from '../../functions/doAddToCart.js';
import { doDeleteToCart } from '../../functions/doDeleteToCart.js';

export const userResolver = {
  Query: {
    // Only for testing
    // getUsersList: () => User.findAll(),
    getUser: (_, { id }) => User.findByPk(id),
  },
  Mutation: {
    createUser: (_, { input: { username, email, password, clientKey, locale } }, { req, res }) =>
      doRegister(username, email, password, clientKey, locale, req, res),
    login: (_, { input: { email, password, sesionId, clientKey, locale } }, { req, res }) =>
      doLogin(email, password, sesionId, clientKey, locale, req, res),
    createCustomer: (_, { input: { email, username } }) => doCreateCustomer(email, username),
    syncroCitCustomer: (_, { input: { email, username } }) => doSyncroCitCustomer(email, username),
    sendEmail: (_, { input: { email, clientKey, locale } }, { req, res }) =>
      doSendEmail(email, clientKey, locale, req, res),
    recoverPassword: (_, { input: { id, password, clientKey, locale } }, { req, res }) =>
      doRecover(id, password, clientKey, locale, req, res),
    updatePassword: (
      _,
      { input: { id, oldPassword, password, clientKey, locale } },
      { req, res },
    ) => doUpdatePassword(id, oldPassword, password, clientKey, locale, req, res),
    updateUser: (_, { input: { id, username, email, clientKey, locale } }, { req, res }) =>
      doUpdateUser(id, username, email, clientKey, locale, req, res),
    deleteUser: (_, { input: { id } }) => doDeleteUser(id),
    addToCart: (_, { input: { id, cart, clientKey, locale } }, { req, res }) =>
      doAddToCart(id, cart, clientKey, locale, req, res),
    deleteToCart: (_, { input: { id, productIdx, cart, clientKey, locale } }, { req, res }) =>
      doDeleteToCart(id, productIdx, cart, clientKey, locale, req, res),
  },
};
