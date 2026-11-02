import { IUserRepository } from "@/modules/users/repository/user.repository.interface.ts";
import type {
  PaginationOptions,
  PaginatedResult,
  UserPublic,
} from "@/modules/users/repository/prisma/user.prisma.repository.ts";
import { graphqlExec } from "@/shared/infra/graphql/execute.ts";

/**
 * Repositório de usuários via camada GraphQL, para PostgreSQL e MongoDB.
 * O provedor (postgres | mongo) é resolvido internamente pelo DATABASE_PROVIDER.
 */
export class GraphQLUserRepository implements IUserRepository {
  // --- CREATE ---
  async create(data: any): Promise<UserPublic | null> {
    const { user } = await graphqlExec(
      `mutation UserCreate($data: UserInput!) {
        userCreate(data: $data) {
          id name email emailVerifiedAt createdAt updatedAt
        }
      }`,
      { data },
    );
    return user;
  }

  // --- FIND BY ID ---
  async findById(id: number): Promise<UserPublic | null> {
    const { user } = await graphqlExec(
      `query User($id: Int!) {
        user(id: $id) {
          id name email emailVerifiedAt createdAt updatedAt
        }
      }`,
      { id },
    );
    return user;
  }

  //--- FIND ONE ---
  async findByEmail(email: string): Promise<UserPublic | null> {
    const { user } = await graphqlExec(
      `query UserByEmail($email: String!) {
        userByEmail(email: $email) {
          id name email emailVerifiedAt createdAt updatedAt
        }
      }`,
      { email },
    );
    return user;
  }

  // --- FIND MANY ---
  async findAll(
    options: PaginationOptions = {},
  ): Promise<PaginatedResult<UserPublic>> {
    const { users } = await graphqlExec(
      `query Users($page: Int, $limit: Int, $role: String) {
        users(page: $page, limit: $limit, role: $role) {
          data {
            id name email emailVerifiedAt createdAt updatedAt
          }
          meta {
            total page limit totalPages
          }
        }
      }`,
      { page: options.page, limit: options.limit, role: options.role },
    );
    return users;
  }

  // --- UPDATE ---
  async update(id: number, data: any): Promise<UserPublic | null> {
    const { user } = await graphqlExec(
      `mutation UserUpdate($id: Int!, $data: UserInput!) {
        userUpdate(id: $id, data: $data) {
          id name email emailVerifiedAt createdAt updatedAt
        }
      }`,
      { id, data },
    );
    return user;
  }

  // --- DELETE ---
  async delete(id: number): Promise<UserPublic | null> {
    const { user } = await graphqlExec(
      `mutation UserDelete($id: Int!) {
        userDelete(id: $id) {
          id name email emailVerifiedAt createdAt updatedAt
        }
      }`,
      { id },
    );
    return user;
  }

  //--- GET PASSWORD ---
  async getPassByEmail(email: string): Promise<any> {
    const { user } = await graphqlExec(
      `query UserCredentialsByEmail($email: String!) {
        userCredentialsByEmail(email: $email) {
          id email name password emailVerifiedAt
        }
      }`,
      { email },
    );
    return user;
  }
}
