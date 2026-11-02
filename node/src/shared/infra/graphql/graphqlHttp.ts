import { Request, Response } from "express";
import { graphqlRun, GraphQLRunResult } from "./execute.ts";
import { env } from "@/config/env.ts";

/**
 * Handler HTTP do endpoint /graphql.
 * Recebe JSON no formato { query, variables } e devolve o resultado GraphQL.
 *
 * A camada de dados (postgresql/Prisma ou mongo/Mongoose) é resolvida
 * pelo DATABASE_PROVIDER e a escolha da camada CRUD pelo CRUD_MODE.
 */
export const graphqlHttpHandler = async (req: Request, res: Response) => {
  const { query, variables } = req.body ?? {};

  if (!query || typeof query !== "string") {
    return res.status(400).json({
      errors: [{ message: "Campo 'query' é obrigatório." }],
    });
  }

  try {
    const result: GraphQLRunResult = await graphqlRun(
      query,
      variables ?? undefined,
    );

    const status = result.errors?.length ? 400 : 200;
    return res.status(status).json({
      ...result,
      extensions: {
        provider: env.DATABASE_PROVIDER,
        crudMode: env.CRUD_MODE,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      errors: [{ message: error?.message ?? "Erro interno no GraphQL." }],
    });
  }
};
