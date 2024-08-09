/* eslint-disable no-undef */
//Dependencies Apollo Server
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import { typeDefs, resolvers } from './graphql/schema.js';
import * as dotenv from 'dotenv';
dotenv.config();

// Dependencies Connection Database Sequelize
import { sequelize } from './database/database.js';
import './models/User.js';

// Start Server Express
const app = express();
const httpServer = http.createServer(app);

// Server Apollo
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({
    req,
    res,
  }),
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Ensure we wait for our server to start
await server.start();

app.use(
  '/graphql',
  bodyParser.json(),
  cors({
    origin: [`${process.env.DEV_CORS}`],
    credentials: true,
  }),
  expressMiddleware(server, {
    context: async ({ res }) => ({ res }),
  }),
);

app.disable('x-powered-by');

await new Promise((resolve) => httpServer.listen({ port: process.env.PORT_DEV }, resolve));

// Connection with DB Sequelize
try {
  await sequelize.sync({ force: false });
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

console.log(`🚀Apollo Server ready at: ${process.env.PORT_DEV}`);
