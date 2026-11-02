import { buildSchema, ExecutionResult, GraphQLSchema, graphql } from "graphql";
import { env } from "@/config/env.ts";
import { schemaString } from "./schema.ts";
import { prismaResolvers } from "./resolvers/prisma.resolvers.ts";
import { mongoResolvers } from "./resolvers/mongo.resolvers.ts";

export type Provider = "prisma" | "mongo";

export type GraphQLErrorShape = {
  message: string;
  path?: (string | number)[];
};

export type GraphQLRunResult<T = any> = {
  data?: T;
  errors?: GraphQLErrorShape[];
};

// O provedor (postgresql | mongo) continua sendo escolhido por DATABASE_PROVIDER,
// enquanto CRUD_MODE decide se a camada usada é a GraphQL.
function resolveProvider(): Provider {
  return env.DATABASE_PROVIDER === "mongo" ? "mongo" : "prisma";
}

// Schema e resolvers por provedor (postgresql/Prisma e mongo/Mongoose)
const providerEntries: Record<
  Provider,
  { schema: GraphQLSchema; resolvers: any }
> = {
  prisma: {
    schema: buildSchema(schemaString),
    resolvers: prismaResolvers,
  },
  mongo: {
    schema: buildSchema(schemaString),
    resolvers: mongoResolvers,
  },
};

/**
 * Executa uma operação GraphQL e retorna o resultado bruto
 * (sem lançar exceções), incluindo os erros quando existirem.
 */
export async function graphqlRun<T = any>(
  source: string,
  variableValues?: Record<string, any>,
): Promise<GraphQLRunResult<T>> {
  const provider = resolveProvider();
  const { schema, resolvers } = providerEntries[provider];

  const result: ExecutionResult = await graphql({
    schema,
    source,
    variableValues,
    rootValue: resolvers,
  });

  return {
    data: result.data as T,
    errors: result.errors?.map((error) => ({
      message: error.message,
      path: error.path,
    })),
  };
}

/**
 * Executa uma operação GraphQL lançando exceção quando há erros.
 * É o helper usado pelas implementações GraphQL dos repositórios CRUD.
 */
export async function graphqlExec<T = any>(
  source: string,
  variableValues?: Record<string, any>,
): Promise<T> {
  const result = await graphqlRun<T>(source, variableValues);

  if (result.errors?.length) {
    throw new Error(`[GraphQL] ${result.errors[0].message}`);
  }

  return result.data as T;
}

// Espelha a mesma lógica para exportar o provedor atual em tempo de execução
export function getCurrentProvider(): Provider {
  return resolveProvider();
}
