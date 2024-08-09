import gql from 'graphql-tag';

export const userTypes = gql`
  type Query {
    getUsersList: [User!]
    getUser(id: UUID!): User!
  }

  type Mutation {
    createUser(input: CreateUserInput): User!
    login(input: LoginInput): AuthPayload!
    createCustomer(input: CreateCustomerInput): User!
    syncroCitCustomer(input: SyncroCitCustomerInput): User!
    sendEmail(input: SendEmailInput): User!
    recoverPassword(input: RecoverPasswordInput): User!
    updatePassword(input: UpdatePasswordInput): User!
    updateUser(input: UpdateUserInput): User!
    deleteUser(input: DeleteUserInput): User!
    addToCart(input: AddToCartInput): User!
    deleteToCart(input: DeleteToCartInput): User!
  }

  input CreateUserInput {
    username: String!
    password: String!
    email: String!
    clientKey: String!
    locale: String!
  }

  input DeleteUserInput {
    id: String!
  }

  input LoginInput {
    email: String!
    password: String!
    sesionId: String!
    clientKey: String!
    locale: String!
  }

  input CreateCustomerInput {
    email: String!
    username: String!
  }

  input SyncroCitCustomerInput {
    email: String!
    username: String!
  }

  input SendEmailInput {
    email: String!
    clientKey: String!
    locale: String!
  }

  input RecoverPasswordInput {
    id: String!
    password: String!
    clientKey: String!
    locale: String!
  }

  input UpdatePasswordInput {
    id: String!
    oldPassword: String!
    password: String!
    clientKey: String!
    locale: String!
  }

  input UpdateUserInput {
    id: String!
    username: String!
    email: String!
    clientKey: String!
    locale: String!
  }

  input UpdatePhoneCustomerInput {
    id: String!
    phone: String!
  }

  input AddToCartInput {
    id: String!
    cart: String!
    clientKey: String!
    locale: String!
  }

  input DeleteToCartInput {
    id: String!
    productIdx: Int!
    cart: String!
    clientKey: String!
    locale: String!
  }

  scalar UUID
  scalar Datetime

  type User {
    id: UUID!
    cit: Int
    avatar: String!
    username: String!
    password: String
    email: String!
    privilege: String!
    token: String!
    createdAt: Datetime!
    updatedAt: Datetime!
    cart: String!
  }

  type AuthPayload {
    token: String!
  }
`;
