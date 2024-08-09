import { userResolver } from './resolvers/userResolver.js';
import { userTypes } from './types/userTypes.js';

export const resolvers = [userResolver];

export const typeDefs = [userTypes];
