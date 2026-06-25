export class IUserRepository {
  create(data: any): Promise<any> {
    throw new Error("Method not implemented");
  }
  findById(id: number): Promise<any> {
    throw new Error("Method not implemented");
  }
  update(id: number, data: any): Promise<any> {
    throw new Error("Method not implemented");
  }
  delete(id: number): Promise<any> {
    throw new Error("Method not implemented");
  }
  /**
   * Busca vários usuários com base em filtros opcionais.
   * @param {string[]} [fields] - Campos específicos para retornar. Ex: ['id', 'name', 'email']
   * @param {number} [skip] - Quantidade de registros a pular (paginação)
   * @param {number} [take] - Quantidade de registros a retornar
   * @param {string} [role] - Filtrar por cargo, por exemplo
   * @returns {Promise<Array>} Lista de usuários encontrados
   */
  // Retorna os usuários e o total de registros encontrados
  findAll(options?: {
    skip?: number;
    take?: number;
    role?: string;
  }): Promise<{ data: any[]; total: number }> {
    throw new Error("Method not implemented");
  }
}
