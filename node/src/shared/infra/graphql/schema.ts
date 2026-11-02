// Schema SDL da camada GraphQL do projeto.
// Cobre todos os métodos CRUD de Users e Clients, para PostgreSQL (Prisma) e MongoDB.

export const schemaString = /* GraphQL */ `
  type User {
    id: Int!
    name: String
    email: String
    emailVerifiedAt: String
    createdAt: String
    updatedAt: String
  }

  # Usuário completo (inclui senha) — usado apenas pelo fluxo de login
  type UserCredentials {
    id: Int!
    email: String!
    name: String
    password: String
    emailVerifiedAt: String
  }

  type Client {
    id: Int!
    userId: Int!
    name: String!
    email: String!
    phone: String
    company: String
    status: String
    notes: String
    createdAt: String
    updatedAt: String
  }

  type PageMeta {
    total: Int!
    page: Int!
    limit: Int!
    totalPages: Int!
  }

  type UsersPage {
    data: [User!]!
    meta: PageMeta!
  }

  type ClientsPage {
    data: [Client!]!
    meta: PageMeta!
  }

  input UserInput {
    name: String
    email: String
    password: String
    role: String
    rememberToken: String
    oauth: Boolean
    emailVerifiedAt: String
  }

  input ClientInput {
    userId: Int
    name: String
    email: String
    phone: String
    company: String
    status: String
    notes: String
  }

  type Query {
    user(id: Int!): User
    userByEmail(email: String!): User
    # Fluxo de login: retorna o usuário completo, com a senha
    userCredentialsByEmail(email: String!): UserCredentials
    users(page: Int, limit: Int, role: String): UsersPage!

    client(id: Int!): Client
    clientByEmail(email: String!): Client
    clients(page: Int, limit: Int, role: String): ClientsPage!
  }

  type Mutation {
    userUpdate(id: Int!, data: UserInput!): User
    userDelete(id: Int!): User
    userCreate(data: UserInput!): User

    clientCreate(data: ClientInput!): Client
    clientUpdate(id: Int!, data: ClientInput!): Client
    clientDelete(id: Int!): Client
  }
`;
