import { IClientRepository } from "@/modules/clients/repository/client.repository.interface.ts";
import type {
  PaginationOptions,
  PaginatedResult,
  ClientPublic,
} from "@/modules/clients/repository/prisma/client.prisma.repository.ts";
import { graphqlExec } from "@/shared/infra/graphql/execute.ts";

/**
 * Repositório de clientes via camada GraphQL, para PostgreSQL e MongoDB.
 * O provedor (postgres | mongo) é resolvido internamente pelo DATABASE_PROVIDER.
 */
export class GraphQLClientRepository implements IClientRepository {
  // --- CREATE ---
  async create(data: any): Promise<ClientPublic | null> {
    const { client } = await graphqlExec(
      `mutation ClientCreate($data: ClientInput!) {
        clientCreate(data: $data) {
          id userId name email phone company status notes createdAt updatedAt
        }
      }`,
      { data },
    );
    return client;
  }

  // --- FIND BY ID ---
  async findById(id: number): Promise<ClientPublic | null> {
    const { client } = await graphqlExec(
      `query Client($id: Int!) {
        client(id: $id) {
          id userId name email phone company status notes createdAt updatedAt
        }
      }`,
      { id },
    );
    return client;
  }

  //--- FIND ONE ---
  async findByEmail(email: string): Promise<ClientPublic | null> {
    const { client } = await graphqlExec(
      `query ClientByEmail($email: String!) {
        clientByEmail(email: $email) {
          id userId name email phone company status notes createdAt updatedAt
        }
      }`,
      { email },
    );
    return client;
  }

  // --- FIND MANY ---
  async findAll(
    options: PaginationOptions = {},
  ): Promise<PaginatedResult<ClientPublic>> {
    const { clients } = await graphqlExec(
      `query Clients($page: Int, $limit: Int, $role: String) {
        clients(page: $page, limit: $limit, role: $role) {
          data {
            id userId name email phone company status notes createdAt updatedAt
          }
          meta {
            total page limit totalPages
          }
        }
      }`,
      { page: options.page, limit: options.limit, role: options.role },
    );
    return clients;
  }

  // --- UPDATE ---
  async update(id: number, data: any): Promise<ClientPublic | null> {
    const { client } = await graphqlExec(
      `mutation ClientUpdate($id: Int!, $data: ClientInput!) {
        clientUpdate(id: $id, data: $data) {
          id userId name email phone company status notes createdAt updatedAt
        }
      }`,
      { id, data },
    );
    return client;
  }

  // --- DELETE ---
  async delete(id: number): Promise<ClientPublic | null> {
    const { client } = await graphqlExec(
      `mutation ClientDelete($id: Int!) {
        clientDelete(id: $id) {
          id userId name email phone company status notes createdAt updatedAt
        }
      }`,
      { id },
    );
    return client;
  }
}
